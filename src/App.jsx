import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import UserContext from "./context/UserContext";

const App = () => {
  const [userName, setUserName] = useState();

  
  useEffect(() => {
    const storedUser = localStorage.getItem("userName"); 
    if (storedUser) {
      setUserName(storedUser);
    } else {
      setUserName("Guest User"); 
    }
  }, []);

  
  useEffect(() => {
    if (userName && userName !== "Guest User") {
      localStorage.setItem("userName", userName); 
    }
  }, [userName]);

  return (
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default App;
