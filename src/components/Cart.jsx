import MenuItemCard from "./MenuItemCard"
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from '../slices/cartSlice';
import Swal from "sweetalert2";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    // Alert to clear cart
    Swal.fire({
      title: "Do you want to Clear the Cart?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Clear the cart - Dispatching an action
        dispatch(clearCart());
      }
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price || item.defaultPrice || 0;
      return total + itemPrice * item.quantity;
    }, 0)
  }
  return (
    <div>
      <h1 className="w-full text-center text-2xl font-bold border-b-2 border-blue-600 mb-[30px]">
        Cart
      </h1>
      <button
        className="py-[3px] px-[10px] text-[1.2rem] text-[#fff] bg-[#E46F20] rounded-[8px] border-none hover:bg-[#016034]"
        onClick={() => handleClearCart()}
      >
        Clear Cart
      </button>
      <div className="w-full shadow-md px-[20px] bg-gray-50 rounded-md py-[10px] my-[30px]">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <MenuItemCard key={item.id} item={item} showQuantityControls />
            ))}
            <div className="text-right text-xl font-semibold text-green-700 pr-5 mt-4">
              Total: ₹{(getTotalPrice() / 100).toFixed(2)}
            </div>
          </>
        ) : (
          <div className="text-center text-2xl font-bold">
            Your cart is empty! Add items to your cart.
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart;
