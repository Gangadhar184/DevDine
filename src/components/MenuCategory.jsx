import { useState } from 'react';
import MenuItemCard from './MenuItemCard';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MenuCategory = ({ category, filterType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const filteredItems = category.itemCards?.filter((item) => {
    const classifier = item.card.info.itemAttribute?.vegClassifier;
    if (filterType === "VEG") return classifier === "VEG";
    if (filterType === "NONVEG") return classifier === "NONVEG";
    return true;
  });

  if (!filteredItems?.length) return null;

  return (
    <div className="mb-6 px-20 ">
  
      <div
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={toggleAccordion}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          {category.title}
        </h2>
        {isOpen ? (
          <FaChevronUp className="text-gray-600" />
        ) : (
          <FaChevronDown className="text-gray-600" />
        )}
      </div>

      {isOpen && (
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.card.info.id} item={item.card.info} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategory;
