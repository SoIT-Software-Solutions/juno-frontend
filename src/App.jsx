import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import backgroundImage from "./images/PC.png";
import EventDetails from "./components/EventDetails";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Team from "./pages/Team";

import SiteNotice from "./components/SiteNotice";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div
        className="bg-fixed bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* <SiteNotice /> */}

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
