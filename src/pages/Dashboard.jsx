import React from "react";
import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, Upload, BookOpen, BarChart2, Settings, User, LogOut, BookOpen as Library } from "lucide-react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Close sidebar when changing routes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Scroll to section if hash is present (for dashboard home section navigation)
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the # character
      const element = document.getElementById(sectionId);
      if (element) {
        // Add a small delay to ensure the DOM is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirect to the login page
  };
  
  // Helper to check if a link is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Handle section navigation from sidebar
  const handleSectionNav = (sectionId) => {
    // If already on dashboard, just scroll to section
    if (location.pathname === "/dashboard") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to dashboard with hash
      navigate(`/dashboard#${sectionId}`);
    }
  };

  const [user, setUser] = useState({ name: "", email: "" });

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setUser({ name: storedUser.name, email: storedUser.email });
  }
}, []);


  return (
    <div className="flex min-h-screen bg-indigo-50">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-indigo-900 bg-opacity-50 backdrop-blur-sm z-20 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-30 h-full bg-gradient-to-b from-indigo-900 to-indigo-800 w-72 shadow-xl transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full text-indigo-100">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 border-b border-indigo-700">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-teal-400 to-cyan-300 text-indigo-900 p-2 rounded-lg">
                <Library size={24} />
              </div>
              <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-100">
                PrepMate
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-8 overflow-y-auto">
            {/* Main Section */}
            <div className="mb-8">
              <p className="px-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">Main</p>
              <div className="space-y-1">
                <Link 
                  to="/dashboard" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === "/dashboard" && !location.hash
                      ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-cyan-300 font-medium"
                      : "text-indigo-100 hover:bg-indigo-700/50"
                  }`}
                >
                  <Home size={20} className="mr-3" />
                  <span>Dashboard</span>
                </Link>
              </div>
            </div>
            
            {/* Study Tools Section */}
            <div className="mb-8">
              <p className="px-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">Study Tools</p>
              <div className="space-y-1">
                <button 
                  onClick={() => handleSectionNav("upload-section")}
                  className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    (location.pathname === "/dashboard/upload" || location.hash === "#upload-section")
                      ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-cyan-300 font-medium"
                      : "text-indigo-100 hover:bg-indigo-700/50"
                  }`}
                >
                  <Upload size={20} className="mr-3" />
                  <span>Upload PDF</span>
                </button>
                <button 
                  onClick={() => handleSectionNav("flashcards-section")}
                  className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    (location.pathname === "/dashboard/flashcards" || location.hash === "#flashcards-section")
                      ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-cyan-300 font-medium"
                      : "text-indigo-100 hover:bg-indigo-700/50"
                  }`}
                >
                  <BookOpen size={20} className="mr-3" />
                  <span>My Flashcards</span>
                </button>
                <button 
                  onClick={() => handleSectionNav("progress-section")}
                  className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    (location.pathname === "/dashboard/progress" || location.hash === "#progress-section")
                      ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-cyan-300 font-medium"
                      : "text-indigo-100 hover:bg-indigo-700/50"
                  }`}
                >
                  <BarChart2 size={20} className="mr-3" />
                  <span>Progress Tracking</span>
                </button>
              </div>
            </div>
            
            {/* Account Section */}
            <div className="mb-8">
              <p className="px-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">Account</p>
              <div className="space-y-1">
                <Link 
                  to="/dashboard/profile" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive("/dashboard/profile") 
                      ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-cyan-300 font-medium"
                      : "text-indigo-100 hover:bg-indigo-700/50"
                  }`}
                >
                  <User size={20} className="mr-3" />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/dashboard/settings" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive("/dashboard/settings") 
                      ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-cyan-300 font-medium"
                      : "text-indigo-100 hover:bg-indigo-700/50"
                  }`}
                >
                  <Settings size={20} className="mr-3" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </nav>
          
          {/* User Profile & Logout */}
          <div className="border-t border-indigo-700 p-4 mt-auto">
          <div className="flex items-center space-x-3 mb-4 py-2">
  <div className="flex-shrink-0">
    <div className="bg-gradient-to-r from-teal-400 to-cyan-300 text-indigo-900 text-sm font-medium rounded-full h-10 w-10 flex items-center justify-center shadow-lg">
      {user.name?.charAt(0).toUpperCase()}
    </div>
  </div>
  <div className="flex-1 min-w-0">
    <p className="text-sm font-medium text-indigo-100 truncate">
      {user.name || "User"}
    </p>
    <p className="text-xs text-indigo-300 truncate">
      {user.email || "email@example.com"}
    </p>
  </div>
</div>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-indigo-100 rounded-lg bg-gradient-to-r from-red-500/20 to-red-400/20 hover:from-red-500/30 hover:to-red-400/30 transition-all duration-200"
            >
              <LogOut size={18} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-indigo-100 shadow-md z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden text-indigo-800 hover:text-indigo-600 focus:outline-none mr-3 transition-colors"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 to-cyan-600">
                {location.pathname === "/dashboard" && !location.hash && "Dashboard Overview"}
                {(location.hash === "#upload-section" || location.pathname === "/dashboard/upload") && "Upload PDF"}
                {(location.hash === "#flashcards-section" || location.pathname === "/dashboard/flashcards") && "My Flashcards"}
                {(location.hash === "#progress-section" || location.pathname === "/dashboard/progress") && "Progress Tracking"}
                {location.pathname === "/dashboard/profile" && "Profile"}
                {location.pathname === "/dashboard/settings" && "Settings"}
              </h2>
            </div>
            
            {/* Search bar */}
            <div className="relative hidden sm:block max-w-xs">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 text-indigo-900 bg-indigo-50 border border-indigo-100 rounded-lg focus:bg-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-indigo-50 to-cyan-50 p-6">
          <Outlet />
        </main>
        
        
      </div>
    </div>
  );
}