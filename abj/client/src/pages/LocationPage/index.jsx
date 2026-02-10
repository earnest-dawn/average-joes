import React, { useState, useEffect, useRef } from 'react';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, setDoc, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const localFirebaseConfig = {
  apiKey: "AIzaSyBdPM16TZ2qjqs87b-4DICsbpWsS_e7sR8",
  authDomain: "average-joes-ce6ff.firebaseapp.com",
  projectId: "average-joes-ce6ff",
  storageBucket: "average-joes-ce6ff.firebasestorage.app",
  messagingSenderId: "670735096994",
  appId: "1:670735096994:web:9d11041d80d7b276d1cbfb",
  measurementId: "G-TKD7JV4DRL"
};

const app_id_global = typeof __app_id !== 'undefined' ? __app_id : 'default-foodtruck-app';
const firebase_config_global = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : localFirebaseConfig;
const initial_auth_token_global = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let app, db, auth;
try {
    app = initializeApp(firebase_config_global);
    db = getFirestore(app);
    auth = getAuth(app);
} catch (error) {
    console.error("Firebase initialization error:", error);
}

const getGoogleMapsEmbedUrl = (address, name) => {
    if (!address) return '';
    const encodedAddress = encodeURIComponent(address);
    const encodedName = encodeURIComponent(name || '');
    return `https://maps.google.com/maps?q=${encodedAddress}&z=15&output=embed`;
};

const LocationPage = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [upcomingLocations, setUpcomingLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const [locationName, setLocationName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [notes, setNotes] = useState('');
    const [editingLocationId, setEditingLocationId] = useState(null);

    const modalRef = useRef(null);
    const [modalMessage, setModalMessage] = useState('');
    const [modalCallback, setModalCallback] = useState(null);

    useEffect(() => {
        if (!auth || !db) {
            setError("Firebase is not initialized. Check your Firebase config.");
            setLoading(false);
            return;
        }

        const authenticate = async () => {
            try {
                if (initial_auth_token_global) {
                    await signInWithCustomToken(auth, initial_auth_token_global);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (err) {
                console.error("Firebase authentication error:", err);
                setError(`Authentication failed: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                setIsAdmin(true);
            } else {
                setUserId(null);
                setIsAdmin(false);
                setCurrentLocation(null);
                setUpcomingLocations([]);
            }
            setLoading(false);
        });

        authenticate();

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!db || !userId) return;

        const locationsCollectionRef = collection(db, `artifacts/${app_id_global}/public/data/foodTruckLocations`);
        const q = query(locationsCollectionRef, orderBy('lastUpdated', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const locations = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const now = new Date();
            let liveLocation = null;
            const upcoming = [];

            locations.forEach(loc => {
                const locStartDate = loc.startDate ? new Date(loc.startDate + 'T' + loc.startTime) : null;
                const locEndDate = loc.endDate ? new Date(loc.endDate + 'T' + loc.endTime) : null;

                const isCurrentlyActive = loc.isCurrent && locStartDate && locEndDate &&
                                          now >= locStartDate && now <= locEndDate;

                if (isCurrentlyActive) {
                    liveLocation = loc;
                } else if (locStartDate && now < locStartDate) {
                    upcoming.push(loc);
                }
            });

            upcoming.sort((a, b) => {
                const dateA = new Date(a.startDate + 'T' + a.startTime);
                const dateB = new Date(b.startDate + 'T' + b.startTime);
                return dateA - dateB;
            });

            setCurrentLocation(liveLocation);
            setUpcomingLocations(upcoming);
            setLoading(false);
        }, (err) => {
            console.error("Firestore data fetch error:", err);
            setError(`Failed to load locations: ${err.message}`);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [db, userId]);


    const resetForm = () => {
        setLocationName('');
        setAddress('');
        setCity('');
        setState('');
        setZip('');
        setStartDate('');
        setEndDate('');
        setStartTime('');
        setEndTime('');
        setNotes('');
        setEditingLocationId(null);
    };

    const handleEdit = (location) => {
        setLocationName(location.name || '');
        setAddress(location.address || '');
        setCity(location.city || '');
        setState(location.state || '');
        setZip(location.zip || '');
        setStartDate(location.startDate || '');
        setEndDate(location.endDate || '');
        setStartTime(location.startTime || '');
        setEndTime(location.endTime || '');
        setNotes(location.notes || '');
        setEditingLocationId(location.id);
    };

    const handleSaveLocation = async (e) => {
        e.preventDefault();
        if (!userId) {
            setModalMessage("You must be authenticated to save locations.");
            modalRef.current.showModal();
            return;
        }
        if (!locationName || !address || !startDate || !startTime || !endTime) {
            setModalMessage("Please fill in Location Name, Address, Start Date, Start Time, and End Time.");
            modalRef.current.showModal();
            return;
        }

        setLoading(true);
        try {
            const locationData = {
                name: locationName,
                address,
                city,
                state,
                zip,
                startDate,
                endDate: endDate || startDate,
                startTime,
                endTime,
                notes,
                isCurrent: false,
                lastUpdated: Date.now(),
                createdBy: userId
            };

            const locationsCollectionRef = collection(db, `artifacts/${app_id_global}/public/data/foodTruckLocations`);

            if (editingLocationId) {
                await updateDoc(doc(locationsCollectionRef, editingLocationId), locationData);
                setModalMessage("Location updated successfully!");
            } else {
                await addDoc(locationsCollectionRef, locationData);
                setModalMessage("Location added successfully!");
            }
            modalRef.current.showModal();
            resetForm();
        } catch (err) {
            console.error("Error saving location:", err);
            setModalMessage(`Error saving location: ${err.message}`);
            modalRef.current.showModal();
        } finally {
            setLoading(false);
        }
    };

    const handleSetLive = async (locationId) => {
        if (!userId) {
            setModalMessage("You must be authenticated to set locations live.");
            modalRef.current.showModal();
            return;
        }
        setLoading(true);
        try {
            const locationsCollectionRef = collection(db, `artifacts/${app_id_global}/public/data/foodTruckLocations`);

            const snapshot = await getDocs(locationsCollectionRef);
            const batchUpdates = [];
            snapshot.forEach(docSnapshot => {
                if (docSnapshot.id !== locationId && docSnapshot.data().isCurrent) {
                    batchUpdates.push(updateDoc(doc(locationsCollectionRef, docSnapshot.id), { isCurrent: false }));
                }
            });
            await Promise.all(batchUpdates);

            await updateDoc(doc(locationsCollectionRef, locationId), { isCurrent: true, lastUpdated: Date.now() });
            setModalMessage("Location set live successfully!");
            modalRef.current.showModal();
        } catch (err) {
            console.error("Error setting location live:", err);
            setModalMessage(`Error setting location live: ${err.message}`);
            modalRef.current.showModal();
        } finally {
            setLoading(false);
        }
    };

    const handleClearLive = async () => {
        if (!userId) {
            setModalMessage("You must be authenticated to clear live location.");
            modalRef.current.showModal();
            return;
        }
        setLoading(true);
        try {
            const locationsCollectionRef = collection(db, `artifacts/${app_id_global}/public/data/foodTruckLocations`);
            const snapshot = await getDocs(locationsCollectionRef);
            const batchUpdates = [];
            snapshot.forEach(docSnapshot => {
                if (docSnapshot.data().isCurrent) {
                    batchUpdates.push(updateDoc(doc(locationsCollectionRef, docSnapshot.id), { isCurrent: false }));
                }
            });
            await Promise.all(batchUpdates);
            setModalMessage("Live location cleared!");
            modalRef.current.showModal();
        } catch (err) {
            console.error("Error clearing live location:", err);
            setModalMessage(`Error clearing live location: ${err.message}`);
            modalRef.current.showModal();
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteLocation = async (locationId) => {
        if (!userId) {
            setModalMessage("You must be authenticated to delete locations.");
            modalRef.current.showModal();
            return;
        }
        setModalMessage("Are you sure you want to delete this location?");
        setModalCallback(async () => {
            setLoading(true);
            try {
                const locationsCollectionRef = collection(db, `artifacts/${app_id_global}/public/data/foodTruckLocations`);
                await deleteDoc(doc(locationsCollectionRef, locationId));
                setModalMessage("Location deleted successfully!");
                modalRef.current.showModal();
            } catch (err) {
                console.error("Error deleting location:", err);
                setModalMessage(`Error deleting location: ${err.message}`);
                modalRef.current.showModal();
            } finally {
                setLoading(false);
            }
        });
        modalRef.current.showModal();
    };

    const closeModal = () => {
        setModalMessage('');
        setModalCallback(null);
        modalRef.current.close();
    };

    const confirmModal = () => {
        if (modalCallback) {
            modalCallback();
        }
        closeModal();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-gray-700 text-lg">Loading Food Truck Data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 text-lg p-4 rounded-md shadow-md">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 font-inter text-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow-inner">
            {/* Custom Modal Dialog */}
            <dialog ref={modalRef} className="modal p-6 rounded-lg shadow-xl bg-white max-w-sm mx-auto my-auto">
                <p className="text-lg font-semibold mb-4">{modalMessage}</p>
                <div className="flex justify-end space-x-4">
                    {modalCallback && (
                        <button
                            onClick={confirmModal}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            Confirm
                        </button>
                    )}
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        {modalCallback ? 'Cancel' : 'Close'}
                    </button>
                </div>
            </dialog>

            {/* Admin Panel */}
            {isAdmin && (
                <div className="admin-panel bg-white p-6 rounded-xl shadow-lg mb-8 border-t-4 border-blue-500">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Admin Panel (User ID: {userId})</h2>
                    <form onSubmit={handleSaveLocation} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2">
                            <label htmlFor="locationName" className="block text-gray-700 font-medium mb-2">Location Name</label>
                            <input
                                type="text"
                                id="locationName"
                                value={locationName}
                                onChange={(e) => setLocationName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Downtown Farmers Market"
                                required
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Street Address</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., 123 Main St"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
                            <input
                                type="text"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Anytown"
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-gray-700 font-medium mb-2">State</label>
                            <input
                                type="text"
                                id="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., CA"
                            />
                        </div>
                        <div>
                            <label htmlFor="zip" className="block text-gray-700 font-medium mb-2">Zip Code</label>
                            <input
                                type="text"
                                id="zip"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., 90210"
                            />
                        </div>
                        <div>
                            <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">End Date (Optional)</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="startTime" className="block text-gray-700 font-medium mb-2">Start Time</label>
                            <input
                                type="time"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="endTime" className="block text-gray-700 font-medium mb-2">End Time</label>
                            <input
                                type="time"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">Special Notes</label>
                            <textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 h-24"
                                placeholder="e.g., Cash only, new menu item, sold out of burgers!"
                            ></textarea>
                        </div>
                        <div className="col-span-1 md:col-span-2 flex justify-center space-x-4 mt-4">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                            >
                                {editingLocationId ? 'Update Location' : 'Add Location'}
                            </button>
                            {editingLocationId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors shadow-md"
                                >
                                    Cancel Edit
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleClearLive}
                                className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
                            >
                                Clear Live Location
                            </button>
                        </div>
                    </form>

                    <h3 className="text-2xl font-bold text-blue-700 mt-8 mb-4 text-center">Managed Locations</h3>
                    {upcomingLocations.length === 0 && !currentLocation ? (
                        <p className="text-center text-gray-600">No locations added yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {currentLocation && (
                                <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center">
                                    <div className="text-left mb-2 sm:mb-0">
                                        <p className="font-bold text-lg">LIVE NOW: {currentLocation.name}</p>
                                        <p className="text-sm">{currentLocation.address}, {currentLocation.city}</p>
                                        <p className="text-sm">
                                            {currentLocation.startDate} {currentLocation.startTime} - {currentLocation.endTime}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(currentLocation)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteLocation(currentLocation.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                            {upcomingLocations.map((loc) => (
                                <div key={loc.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                                    <div className="text-left mb-2 sm:mb-0">
                                        <p className="font-bold">{loc.name}</p>
                                        <p className="text-sm text-gray-600">{loc.address}, {loc.city}</p>
                                        <p className="text-sm text-gray-600">
                                            {loc.startDate} {loc.startTime} - {loc.endTime}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleSetLive(loc.id)}
                                            className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
                                        >
                                            Set Live
                                        </button>
                                        <button
                                            onClick={() => handleEdit(loc)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteLocation(loc.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Customer Facing View */}
            <div className="customer-view bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
                <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Find Our Food Truck!</h2>

                {currentLocation ? (
                    <div className="current-location mb-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">We Are Here Today!</h3>
                        <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="w-full md:w-1/2 flex-shrink-0">
                                <iframe
                                    title="Food Truck Location Map"
                                    src={getGoogleMapsEmbedUrl(`${currentLocation.address}, ${currentLocation.city}, ${currentLocation.state} ${currentLocation.zip}`, currentLocation.name)}
                                    width="100%"
                                    height="300"
                                    style={{ border: 0, borderRadius: '8px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                            <div className="w-full md:w-1/2 text-left">
                                <p className="text-xl font-bold text-blue-700 mb-2">{currentLocation.name}</p>
                                <p className="text-lg text-gray-700 mb-1">{currentLocation.address}</p>
                                <p className="text-lg text-gray-700 mb-1">{currentLocation.city}, {currentLocation.state} {currentLocation.zip}</p>
                                <p className="text-xl font-semibold text-green-600 mt-3">
                                    Open: {currentLocation.startTime} - {currentLocation.endTime}
                                </p>
                                {currentLocation.notes && (
                                    <p className="text-md text-gray-600 italic mt-2">Notes: {currentLocation.notes}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-4">
                                    Last Updated: {new Date(currentLocation.lastUpdated).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-600 text-lg mb-8 p-4 bg-yellow-50 rounded-lg shadow-sm">
                        <p className="font-semibold mb-2">We're not currently live, but check out our upcoming schedule!</p>
                        <p className="text-sm"> (Admin: Please set a location live from the panel above)</p>
                    </div>
                )}

                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upcoming Schedule</h3>
                {upcomingLocations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {upcomingLocations.map((loc) => (
                            <div key={loc.id} className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200">
                                <p className="font-bold text-lg text-blue-600">{loc.name}</p>
                                <p className="text-sm text-gray-700">{loc.address}, {loc.city}</p>
                                <p className="text-sm text-gray-600">
                                    {loc.startDate} {loc.startTime} - {loc.endTime}
                                    {loc.endDate && loc.endDate !== loc.startDate && ` (until ${loc.endDate})`}
                                </p>
                                {loc.notes && (
                                    <p className="text-xs text-gray-500 mt-1 italic">Notes: {loc.notes}</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No upcoming locations scheduled yet.</p>
                )}
            </div>
        </div>
    );
};

export default LocationPage;
