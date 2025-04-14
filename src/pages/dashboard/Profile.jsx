import React, { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});

  const handleEditProfile = () => {
    // Implement logic to edit profile
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
      <div className="bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
            value={user.name || "John Doe"}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
            value={user.email || "john.doe@example.com"}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            disabled
          />
        </div>

        {/* Edit and Delete Profile */}
        <button
          onClick={handleEditProfile}
          className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition duration-300 mr-4"
        >
          Edit Profile
        </button>
        <button
          onClick={handleDeleteProfile}
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-300"
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
}
