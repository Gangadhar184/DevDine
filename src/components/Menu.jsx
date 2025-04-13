
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import { MdStarRate } from 'react-icons/md';
import RestaurantHeader from './RestaurantHeader';
import MenuCategory from './MenuCategory';

const IMG_CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/";

const Menu = () => {

    const { resId } = useParams();
    const [menuList, setMenuList] = useState(null);
    


    useEffect(() => {
        const fetchMenuList = async () => {
            try {
                const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.493532&lng=78.440384&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
                if (!data.ok) {
                    throw new Error("Failed to fetch menu data");
                }
                const json = await data.json();
                console.log(json);
                setMenuList(json.data);

            } catch (error) {
                console.error("Error fetching menu: ", error);
            }
        }
        fetchMenuList();
    }, [resId]);

    // const { cloudinaryImageId,
    //     name,
    //     avgRatingString,
    //     totalRatingsString,
    //     cuisines,
    //     locality,
    //     sla,} = menuList?.cards?.[2]?.card?.card?.info || {};
    const restaurantInfo = menuList?.cards?.[2]?.card?.card?.info || {};

    const cards = menuList?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

    const categories = cards.map((card) => card.card.card).filter((card) => card["@type"]?.includes("ItemCategory"));

    // const categories = cards.flatMap((card) => {
    //     const cardData = card.card.card;
    //     const type = cardData["@type"];

    //     if (type?.includes("ItemCategory")) {
    //       return [cardData];
    //     }

    //     if (type?.includes("NestedItemCategory") && Array.isArray(cardData.categories)) {
    //       return cardData.categories;
    //     }

    //     return [];
    //   });


    if (!menuList) return <Shimmer />

    return (
        <div className='max-x-4xl mx-auto px-4 py-8'>
            <RestaurantHeader info={restaurantInfo} />
            {
                categories.length ? (
                    categories.map((category) => (
                        <MenuCategory key={category.title} category={category} />
                    ))
                ) : (
                    <h1>No Items available</h1>
                )
            }
        </div>
    );
}

export default Menu
