import React from 'react';
import { MdStarRate } from 'react-icons/md';

const IMG_CDN_URL = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/';

const RestaurantHeader = ({ info }) => {
  const {
    name,
    cloudinaryImageId,
    cuisines,
    locality,
    avgRatingString,
    totalRatingsString,
    sla,
  } = info;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6 mb-8">
      <img
        src={IMG_CDN_URL + cloudinaryImageId}
        alt={name}
        className="w-40 h-40 object-cover rounded-xl shadow"
      />
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-semibold mb-1">{name}</h1>
        <p className="text-gray-600">{locality}</p>
        <p className="text-gray-500 text-sm mb-2">{cuisines?.join(', ')}</p>
        <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <MdStarRate
              className="text-white rounded-full p-1"
              size={20}
              style={{
                backgroundColor: avgRatingString >= 4.0 ? '#16a34a' : '#dc2626',
              }}
            />
            <span>
              {avgRatingString || 3.8} ({totalRatingsString || '1K+ ratings'})
            </span>
          </div>
          <span className="text-gray-400">|</span>
          <span>{sla?.slaString}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
