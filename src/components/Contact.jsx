import { useState } from 'react'
import contactUs from "../assets/contactUs.png"

const Contact = () => {
  const [message, setMessage] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true)
  }
  return (
    <>
    
    <div>
      <img src={contactUs} alt="contact us" />
    </div>
    <div className="contact-right">
        <h1>Contact us</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Type your Message here..." required></textarea>
          <button type="submit">Submit</button>
        
          {message && (
            <span>Thanks for contacting FoodFire, We will reply ASAP.</span>
          )}
        </form>
      </div>
    </>
  )
}

export default Contact
