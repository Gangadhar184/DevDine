
import { MdStarRate } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { addItem, removeItem } from '../slices/cartSlice';

const IMG_CDN_URL = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/';

const MenuItemCard = ({ item, showQuantityControls = false }) => {

  //dispatch - It is a function that sends actions to store

  const dispatch = useDispatch();
  // const cardItems = useSelector((state) => state.cart.items);

  const {
    name,
    price,
    defaultPrice,
    ratings,
    imageId,
    description,
    quantity = 0,
  } = item;

  console.log(item);

  const handleAddToCart = () => {
    Swal.fire({
      title: "Do you want to Add Item to the Cart? ",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addItem(item));
      }
    })
  }

  const handleRemoveFromCart = () => {
    Swal.fire({
      title: "Do you want to Remove Item from the Cart ?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItem(item))
      }
    })
  }

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

        {
          !showQuantityControls ? (
            <button onClick={() => handleAddToCart(item)} className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-1.5 rounded">
              ADD
            </button>
          ) : (
            <div className="flex items-center justify-between gap-2 bg-gray-200 px-3 py-1 rounded">
              <button
                onClick={handleRemoveFromCart}
                className="text-lg text-red-600 font-bold px-2"
              >
                –
              </button>
              <span className="text-base font-medium">{quantity}</span>
              <button
                onClick={handleAddToCart}
                className="text-lg text-green-600 font-bold px-2"
              >
                +
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default MenuItemCard;
