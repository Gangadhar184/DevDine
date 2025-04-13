import React, { useState } from "react";
import { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useOnlineStatus } from "../utils/useOnlineStatus";

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
  if(onlineStatus === "false") {
    return <h1>Looks likes you are offline !! Check your internet connection</h1>
  }

  return filteredList.length === 0 ? (
    <Shimmer />
  ) : (
    <>
    <section className="flex flex-col md:flex-row gap-4 p-4 items-center justify-between">
      <div className="w-full md:w-[60%] flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e)=> e.key === "Enter" && handleSearch()} 
          placeholder="Search For restaurants and food"
          className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button onClick={handleSearch} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">Search</button>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
      <button
        onClick={filterTopRatedRestaurants}
        className="px-4 py-2 text-sm border border-gray-400 rounded hover:bg-gray-100 transition cursor-pointer"
      >
        Top Rated Restaurants
      </button>
      <button
        className="px-4 py-2 text-sm border border-gray-400 rounded hover:bg-gray-100 transition cursor-pointer"
        onClick={() => setFilteredList(restaurantList)}
      >
        Reset
      </button>
      </div>
      </section>
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredList.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </>
  );
};

export default Body;
