import React, { useState } from "react";
import { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

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
        res.name.toLowerCase().includes(searchText) ||
        res.cuisines.toLowerCase().includes(searchText)
    );
    setFilteredList(matchedResults);
  };

  return filteredList.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search For restaurants and food"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <button
        onClick={filterTopRatedRestaurants}
        className="border-2 px-1 py-2 cursor-pointer "
      >
        Top Rated Restaurants
      </button>
      <button
        className="px-1 py-2 border-2"
        onClick={() => setFilteredList(restaurantList)}
      >
        Reset
      </button>
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredList.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </>
  );
};

export default Body;
