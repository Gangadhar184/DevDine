import { useState } from 'react';
import contactUs from "../assets/contactUs.png";

const Contact = () => {
  const [message, setMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-10 max-w-6xl mx-auto">
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          src={contactUs}
          alt="Contact Us"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            required
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Type your message here..."
            required
            rows="5"
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            className="bg-blue-500 cursor-pointer text-white py-2 px-6 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>

          {message && (
            <span className="text-green-600 font-medium">
              Thanks for contacting DevDine, we’ll reply ASAP!
            </span>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
