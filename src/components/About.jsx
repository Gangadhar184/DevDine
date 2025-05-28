import burgerImage from '../assets/burgerImage.png';

const About = () => {
  return (
    <section className="px-4 py-10 max-w-6xl mx-auto flex flex-col items-center gap-8 text-center">
      
      {/* Headings */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Welcome to the World of Taste & Fresh Food
        </h1>
        <h4 className="text-lg sm:text-xl text-gray-600">
          "Better you will feel if you eat a <span className="text-red-500 font-semibold">DevDine</span> healthy meal"
        </h4>
      </div>

      {/* Image */}
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl">
        <img
          src={burgerImage}
          alt="Food"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default About;
