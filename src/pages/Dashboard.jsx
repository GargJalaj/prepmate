import React from "react";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional: clean icons for toggle

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-30 h-full bg-white w-64 space-y-6 py-7 px-2 border-r shadow-md transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="text-center font-bold text-xl text-blue-600">Prepmate</div>
        <nav className="mt-10 space-y-2">
          <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-blue-100">
            🏠 Home
          </Link>
          <Link to="/dashboard/profile" className="block py-2 px-4 rounded hover:bg-blue-100">
            👤 Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left py-2 px-4 rounded text-red-500 hover:bg-red-100"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar with toggle for mobile */}
        <div className="bg-white px-4 py-3 border-b shadow-md flex items-center justify-between md:hidden">
          <h2 className="text-xl font-bold text-blue-600">Prepmate</h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-blue-600 focus:outline-none"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet /> {/* This will render the default page or selected page */}
        </main>
      </div>
    </div>
  );
}
