import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrderOnline from './pages/OrderOnlinePage';
import About from './pages/AboutPage';
import ErrorPage from './pages/errorPage';
import LogInPage from './pages/LoginPage';
import LocationPage from './pages/LocationPage';
import AdminPage from './pages/AdminPages/AdminHomePage';
import ManageMenuPage  from './pages/AdminPages/ManageMenuPage';
import ManageCombosPage from './pages/AdminPages/ManageCombosPage ';
import ManageRestaurantsPage from './pages/AdminPages/ManageRestaurantsPage';
import RegistrationPage from './pages/RegistrationPage';
import ManageOrdersPage from './pages/AdminPages/ManageOrdersPage';
import environment from "./network";
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: '/orderOnline', element: <OrderOnline /> },
            { path: '/about', element: <About /> },
            { path: '/location', element: <LocationPage /> },
            { path: '/yougoodbro?', element: <ErrorPage /> },
            { path: '/manageMenu', element: <ManageMenuPage /> },
            { path: '/manageCombos', element: <ManageCombosPage /> },
            { path: '/manageRestaurants', element: <ManageRestaurantsPage /> },
            { path: '/manageOrders', element: <ManageOrdersPage /> },
            { path: '/login?', element: <LogInPage /> },
            { path: '/admin?', element: <AdminPage />},
            { path: '/register', element: <RegistrationPage /> }
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

reportWebVitals();
