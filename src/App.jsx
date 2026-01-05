import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";

{/* Pages */}
import Home from "./pages/Home";
import { About } from "./pages/About";
import { Navbar } from "./components/NavBar";
import { Day1RegForm } from "./pages/Day1RegForm";
import { Day2RegForm } from "./pages/Day2RegForm";
import Contact from "./pages/Contact";
import { Events } from "./pages/Events";
import { GalleryPage } from "./pages/Gallery";
import Team from "./pages/Team";

{/* Components */}  
import EventDetails from "./components/EventDetails";
import backgroundImage from "./images/PC.jpg";
import { Footer } from "./components/Footer";


function App() {
  return (
    <div className="bg-black cursor-default select-none">
      <Router>
        <div
          className="bg-fixed bg-cover min-h-max"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/forms/day1" element={<Day1RegForm />} />
            <Route path="/forms/day2" element={<Day2RegForm />} />
            <Route path="/forms" element={<Navigate to="/events" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
