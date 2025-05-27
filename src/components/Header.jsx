import { Link, useNavigate } from 'react-router-dom'
import { useOnlineStatus } from '../utils/useOnlineStatus'
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const Header = () => {

  const onlineStatus = useOnlineStatus();
  const navigate = useNavigate();
  const { loggedInUser, setUserName } = useContext(UserContext);
  const isLoggedIn = loggedInUser && loggedInUser !== "Guest User";

  const handleLogout = () => {
    setUserName("Guest User");
    localStorage.removeItem("userName");
    navigate("/");
  };
  return (
    <section className='flex items-center justify-between px-10 py-3 shadow-md'>

      <div className='flex items-center'>
        <img className='w-20' src="src/assets/logo.jpg" alt="logo" />
        <span className='ms-3 text-2xl font-bold'>DevDine</span>
      </div>


      <ul className='flex items-center justify-center gap-5'>

        <li>Online : {onlineStatus ? "🟢" : "🔴"}</li>
        <li>{loggedInUser ? loggedInUser.slice(0, 20) : ""}</li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="contact">Contact</Link></li>
        <li><Link to="cart">Cart</Link></li>
        <li>
          <button
            className="px-4 cursor-pointer py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </li>
      </ul>
    </section>
  )
}

export default Header;
