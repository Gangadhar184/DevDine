import React, { useState } from 'react'
import burgerImage from "../../public/burgerImage.png";
import { Link, Outlet } from 'react-router-dom';

const About = () => {

  const [show, setShow] = useState(false) ;

  return (
    <>
    <div>
      {
        show? (
          <>
          <Link to={"/about"}>
            <button onClick={()=>setShow(false)}>Hide My Profile</button>
          </Link>
          <Outlet/>
          </>
        ) : (
          <Link to={"profile"}>
            <button
              className="about-profile-button"
              onClick={() => setShow(true)}
            >
              Show My Profile
            </button>
          </Link>
        )
      }
    </div>
    <div>
      <h1>Welcome To the The World of Tast & Frest Food</h1>
      <h4>"Better You will feel if you eat a Food <span>Fire</span> healthy meal"</h4>
    
    </div>
    <div>
      <img src={burgerImage} alt="Food image" />
    </div>
    </>
  )
}

export default About
