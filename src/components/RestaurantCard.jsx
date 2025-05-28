const RestaurantCard = ({ restaurant }) => {
    const { name, image, deliveryTime, avgRating, cuisines, costForTwo } = restaurant;

    return (
        <section className="w-full bg-[#1e293b] rounded-xl overflow-hidden text-white shadow-md hover:scale-[1.03] transition-transform duration-200">
            <img className="h-40 w-full object-cover" src={image} alt={name} />

            <div className="p-4 space-y-2">
                <p className="text-lg font-semibold truncate">{name}</p>
                <p className="text-sm text-gray-300 line-clamp-1">{cuisines}</p>

                <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>{deliveryTime} MINS</span>
                    <span>{avgRating} ⭐</span>
                </div>

                <p className="text-sm font-medium text-gray-200">{costForTwo}</p>
            </div>
        </section>
    );
};

export default RestaurantCard;
