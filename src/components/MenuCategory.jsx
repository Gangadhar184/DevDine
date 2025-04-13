import React from 'react';
import MenuItemCard from './MenuItemCard';

const MenuCategory = ({ category }) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-1">
        {category.title}
      </h2>
      <div className="space-y-6">
        {category.itemCards?.map((item) => (
          <MenuItemCard key={item.card.info.id} item={item.card.info} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
