import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Welcome to Prepmate Dashboard</h2>
      <p className="text-gray-600">Here you can upload PDFs to generate flashcards and track your progress.</p>
      
      {/* Upload PDF button */}
      <Link
        to="/dashboard/upload"
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Upload PDF
      </Link>

      {/* Flashcard progress */}
      <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Flashcard Progress</h3>
        <p className="text-gray-600">Track the time spent reviewing flashcards.</p>
        {/* Here you can display the timer or progress bar based on your implementation */}
      </div>
    </div>
  );
}
