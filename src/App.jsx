import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import { Footer } from "./components/Footer";
import backgroundImage from "./images/PC.webp";
import EventDetails from "./components/EventDetails";
import RegisterOAuth from "./pages/RegisterOAuth";
import ScrollToTop from "./components/ScrollToTop";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import Navbar from "./components/NavBar";
import { ProtectedFormRoute } from "./components/RegistrationForm/ProtectedFormRoute";
import { RegistrationPage } from "./pages/RegistrationPage";
import Contact from "./pages/Contact";
import { Events } from "./pages/Events";
import { GalleryPage } from "./pages/Gallery";
import Team from "./pages/Team";
import { AuthSuccess } from "./pages/AuthSuccess";
import { apiClient } from "./common/utils/apiClient";
import { useEffect } from "react";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import { NotFound } from "./pages/NotFound";

function App() {
  async function checkRefreshCookie() {
    try {
      const res = await apiClient.get("/auth/user");
      // console.log("User authenticated! Cookie exists and valid:", res.data);
      // alert("User authenticated! Cookie exists and valid");
    } catch (err) {
      console.log(
        "No valid cookie / user not authenticated:",
        err.response?.status,
      );
      // alert("No valid cookie / user not authenticated");
    }
  }

  useEffect(() => {
    checkRefreshCookie();
  }, []);

  return (
    <div className="cursor-default select-none relative min-h-screen">
      {/* Fixed Background Layer */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      <Router>
        <ScrollToTop />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route
                path="/register/:day"
                element={
                  <ProtectedFormRoute>
                    <RegistrationPage />
                  </ProtectedFormRoute>
                }
              />
              <Route
                path="/forms"
                element={<Navigate to="/events" replace />}
              />
              <Route path="/google" element={<RegisterOAuth />} />
              <Route path="/register/:day/payment" element={<PaymentPage />} />
              <Route path="/auth/success" element={<AuthSuccess />} />
              <Route
                path="/register/:day/payment/success"
                element={<PaymentSuccessPage />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
