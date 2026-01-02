const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
      <div className="flex flex-wrap w-full max-w-4xl p-6 bg-black bg-opacity-60 rounded-lg shadow-xl backdrop-blur-md">
        <div className="w-full lg:w-1/2 p-6 bg-black bg-opacity-70 rounded-lg flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="4"
              className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-[#ffd25b] to-[#f8b13d] text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 p-6 flex flex-col">
          <button
            onClick={() =>
              window.open("https://maps.app.goo.gl/6VFGgjMdhkFgiiSU6", "_blank")
            }
            className="w-full p-16 bg-gradient-to-r from-[#ffd25b] to-[#f8b13d] text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            Our Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
