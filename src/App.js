import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import PageWrapper from "./PageWrapper";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Profile from "./pages/dashboard/Profile";
import Home from "./pages/dashboard/Home";
import Flashcards from "./pages/Flashcards";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/upload" element={<PageWrapper><Upload /></PageWrapper>} />
        <Route path="/flashcards" element={<PageWrapper><Flashcards /></PageWrapper>} />
        {/* Dashboard routes with nested pages */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* This is where the default page will render */}
          <Route index element={<DashboardHome />} /> {/* Set Home as default */}
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
