import { Link, useNavigate } from 'react-router-dom';
import { useOnlineStatus } from '../utils/useOnlineStatus';
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const onlineStatus = useOnlineStatus();
  const navigate = useNavigate();
  const cartItemCount = useSelector((state) => state.cart.items.length);
  const { loggedInUser, setUserName } = useContext(UserContext);
  const isLoggedIn = loggedInUser && loggedInUser !== "Guest User";


  const handleLogout = () => {
    setUserName("Guest User");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <header className="w-full shadow-md px-4 py-3 bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        <div className="flex items-center">
          <img className="w-16 sm:w-20" src="src/assets/logo.jpg" alt="logo" />
          <span className="ms-3 text-xl sm:text-2xl font-bold">DevDine</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <span>Online: {onlineStatus ? "🟢" : "🔴"}</span>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart" className="relative flex items-center gap-2">
            <div className="relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>

          <button
            className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition"
            onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
          <span className="hidden sm:inline-block">{loggedInUser?.slice(0, 20)}</span>
        </nav>


        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 px-4">
          <span>Online: {onlineStatus ? "🟢" : "🔴"}</span>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="relative flex items-center gap-2"
          >
            <div className="realtive">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>

          <button
            className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            onClick={() => {
              setMenuOpen(false);
              isLoggedIn ? handleLogout() : navigate("/login");
            }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
          <span>{loggedInUser?.slice(0, 20)}</span>
        </div>
      )}
    </header>
  );
};

export default Header;
