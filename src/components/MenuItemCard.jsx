import React from 'react';
import { MdStarRate } from 'react-icons/md';

const IMG_CDN_URL = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/';

const MenuItemCard = ({ item }) => {
  const {
    
    name,
    price,
    defaultPrice,
    ratings,
    imageId,
    description,
  } = item;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6 border-b pb-6">
      <div className="flex-1">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-gray-600 mb-1">₹{(price || defaultPrice) / 100}</p>
        <p className="text-gray-500 text-sm mb-2">
          {description?.slice(0, 100) || 'No description'}
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <MdStarRate
            className="text-white rounded-full p-1"
            size={20}
            style={{
              backgroundColor:
                ratings?.aggregatedRating?.rating >= 4.0 ? '#16a34a' : '#dc2626',
            }}
          />
          <span>
            {ratings?.aggregatedRating?.rating || 3.8} (
            {ratings?.aggregatedRating?.ratingCountV2 || 6})
          </span>
        </div>
      </div>
      <div className="min-w-[120px]">
        {imageId && (
          <img
            src={IMG_CDN_URL + imageId}
            alt={name}
            className="w-full h-28 object-cover rounded-lg mb-2 shadow"
          />
        )}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-1.5 rounded">
          ADD
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
