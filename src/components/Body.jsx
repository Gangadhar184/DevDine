import { useState } from "react";
import { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { Link } from "react-router-dom";

const Body = () => {

  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const loadRestaurantData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.493532&lng=78.440384&str=restaurants&trackingId=45607fbe-e55b-7025-8e09-c93ede847864&submitAction=ENTER&queryUniqueId=85be035c-20d2-1932-de27-89abdbe7bb30"
    );
    const response = await data.json();

    const restaurantCards =
      response.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards ||
      [];

    const fetchedRestaurantList = restaurantCards
      .filter(
        (item) =>
          item.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
      )
      .map((item) => {
        const info = item.card.card.info;
        return {
          id: info.id,
          name: info.name,
          deliveryTime: info.sla.deliveryTime,
          avgRating: info.avgRating,
          cuisines: info.cuisines.join(", "),
          costForTwo: info.costForTwoMessage,
          image: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${info.cloudinaryImageId}`,
        };
      });
    setRestaurantList(fetchedRestaurantList);
    setFilteredList(fetchedRestaurantList);
  };

  useEffect(() => {
    loadRestaurantData();
  }, []);

  const filterTopRatedRestaurants = () => {
    const topRatedRestaurants = restaurantList.filter(
      (res) => res.avgRating >= 4.0
    );
    setFilteredList(topRatedRestaurants);
  };

  const handleSearch = () => {
    const matchedResults = restaurantList.filter(
      (res) =>
        res.name.toLowerCase().includes(searchText.trim().toLowerCase()) ||
        res.cuisines.toLowerCase().includes(searchText.trim().toLowerCase())
    );
    setFilteredList(matchedResults);
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return <h1>Looks like you are offline !! Check your internet connection</h1>
  }

  return filteredList.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <section className="w-full p-4">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">

          {/* Spacer to push search bar to center on large screens */}
          <div className="hidden md:block md:flex-1" />

          {/* Search Bar - Centered */}
          <div className="w-full md:w-[40%] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search For restaurants and food"
              className="w-full sm:flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Search
            </button>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 justify-center md:justify-end md:flex-1">
            <button
              onClick={filterTopRatedRestaurants}
              className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-400 rounded hover:bg-gray-100 transition cursor-pointer"
            >
              Top Rated Restaurants
            </button>
            <button
              onClick={() => setFilteredList(restaurantList)}
              className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-400 rounded hover:bg-gray-100 transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </section>




      <div className="grid gap-6 px-4 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5">
        {filteredList.map((restaurant) => (
          <Link key={restaurant.id} to={"/restaurants/" + restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Body;
