

const RestaurantCard = ({ restaurant }) => {
    
    const { name, image, deliveryTime, avgRating, cuisines, costForTwo } = restaurant;

   
    return (
        <section className="w-full sm:w-[45%] md:w-[30%] lg:w-64 h-100 rounded-lg bg-[#1e293b] overflow-hidden relative text-white shadow-md hover:scale-[1.03] transition-transform duration-200 mt-10">
            <img className='h-40 w-full object-cover' src={image} alt={name} />
            <div className='p-3 space-y-2'>
                <p className='text-lg font-semibold truncate'>{name}</p>
                <p className=''>{cuisines}</p>
                <div>
                    <p>{deliveryTime} MINS</p>
                    <p>{avgRating} ⭐</p>
                </div>
                <p>{costForTwo}</p>
            </div>
        </section>
    )
}

export default RestaurantCard
