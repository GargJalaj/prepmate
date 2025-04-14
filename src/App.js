import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import PageWrapper from "./PageWrapper";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Home from "./pages/dashboard/Home";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/upload" element={<PageWrapper><Upload /></PageWrapper>} />
        
        {/* Dashboard routes with nested pages */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* This is where the default page will render */}
          <Route index element={<Home />} /> {/* Set Home as default */}
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
