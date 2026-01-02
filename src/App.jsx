import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Navbar } from "./components/NavBar";
import {Footer} from "./components/Footer";
import backgroundImage from "./images/PC.jpg";
import EventDetails from "./components/EventDetails";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import { About } from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Team from "./pages/Team";

function App() {
  return (
    <div className="bg-black cursor-default select-none">
      <Router>
        <ScrollToTop />
        <div
          className="bg-fixed bg-cover min-h-max"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
