import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import UserContext from "./context/UserContext";

import { Provider } from "react-redux";
import appStore from './store/appStore';

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

    <Provider store={appStore} >
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

export default App;
