import React, { useState } from 'react';
import { Camera, X, UploadCloud } from 'lucide-react';

const ReviewForm = ({ menuItemId }) => {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [ratingText, setratingText] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [tempUrl, setTempUrl] = useState('');

  const emojis = ['🔥', '🍔', '⭐', '🤮'];

  const addImageUrl = () => {
    if (tempUrl && !imageUrls.includes(tempUrl)) {
      setImageUrls([...imageUrls, tempUrl]);
      setTempUrl('');
    }
  };

  const removeImage = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800">
      <h3 className="text-xl font-bold mb-6 text-center">Rate Your Meal</h3>
      
      {/* Emoji Selection */}
      <div className="flex justify-between mb-8 px-4">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => setSelectedEmoji(emoji)}
            className={`text-4xl p-3 rounded-xl transition-all duration-200 ${
              selectedEmoji === emoji 
              ? 'bg-yellow-500 scale-110 shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
              : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Review Text */}
      <textarea
        className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none mb-4 h-24"
        placeholder="How was it? Share your thoughts..."
        value={ratingText}
        onChange={(e) => setratingText(e.target.value)}
      />

      {/* Image Upload Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
          <Camera size={16} /> Add Photos (URLs)
        </label>
        
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            className="flex-1 bg-slate-800 border border-slate-700 p-2 rounded-lg text-sm"
            placeholder="Paste image link here..."
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
          />
          <button 
            onClick={addImageUrl}
            className="bg-yellow-600 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Image Previews */}
        <div className="grid grid-cols-3 gap-2">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img 
                src={url} 
                alt="preview" 
                className="w-full h-full object-cover rounded-lg border border-slate-700"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Invalid+Link'; }}
              />
              <button 
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {imageUrls.length < 3 && (
            <div className="border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center text-slate-500 aspect-square">
              <UploadCloud size={24} />
              <span className="text-[10px] mt-1">Add Photo</span>
            </div>
          )}
        </div>
      </div>

      <button 
        disabled={!selectedEmoji || !ratingText}
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Post Review
      </button>
    </div>
  );
};

export default ReviewForm;