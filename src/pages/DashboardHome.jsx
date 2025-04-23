import React, { useState, useRef } from "react";
import { Upload, BookOpen, BarChart2, Award, ChevronRight, FileText, Plus, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DashboardHome() {
  const navigate = useNavigate();
  
  const [uploadStatus, setUploadStatus] = useState("Select PDF");
  const uploadSectionRef = useRef(null);
  const flashcardsSectionRef = useRef(null);
  const progressSectionRef = useRef(null);
  
  const [userData, setUserData] = useState({
    name: '',
    streak: 0,
    cardsCreated: 0,
    cardsStudied: 0,
    dueToday: 0,
    recentDecks: [],
    weeklyProgress: [],
    recentPdfs: []
  });
  
  const [studyTime, setStudyTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStudyTime(prevTime => prevTime + 1); // Increment time by 1 second
    }, 1000); // 1 second interval

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await res.json();
        console.log(data);
  
        // Set user data with default fallback values
        setUserData({
          name: data.name || '',
          streak: data.streak || 0,
          cardsCreated: data.cardsCreated || 0,
          cardsStudied: data.cardsStudied || 0,
          dueToday: data.dueToday || 0,
          recentDecks: data.recentDecks || [],
          weeklyProgress: data.weeklyProgress || [],
          recentPdfs: data.recentPdfs || [],
        });
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchUserData();
  }, []);
    

  


  // File upload handling
  const [selectedFile, setSelectedFile] = useState(null);
const fileInputRef = useRef(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file);
    setUploadStatus("Upload PDF"); // Change button text when a file is selected
  }
};


const handleFileUpload = async () => {
  if (!selectedFile) {
    alert("No file selected!");
    return;
  }
  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to upload file");
    }

    const data = await res.json();
    setUploadStatus("Generate Flashcards"); // Change button text after upload
      alert("File uploaded successfully!");
      setUploadStatus("Generate Flashcards");
      const generateRes = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ fileId: data.fileId }), // assuming backend returns fileId
      });
  
      if (!generateRes.ok) {
        throw new Error("Flashcard generation failed");
      }
  
      const genResult = await generateRes.json();
      if (genResult.success) {
        navigate("/flashcards");
      }

    // Reset file input after successful upload
    setSelectedFile(null);
    fileInputRef.current.value = ""; // Reset file input UI
    setUploadStatus("Select PDF");
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};
  
  
return (
  <div className="bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen">
    
    {/* Main Content */}
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      
      {/* Welcome Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            {/* Add a check to ensure userData is not null */}
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, {userData ? userData.name : "Loading..."}!
            </h1>
            <p className="text-gray-600 mt-1">Let's continue your learning journey</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg shadow-sm">
            <Award size={20} className="mr-2" />
            <span className="font-medium">{userData ? userData.streak : "Loading..."}-day streak!</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="space-y-8">
        
        {/* Upload PDF Section */}
        <section
          ref={uploadSectionRef}
          id="upload-section"
          className="scroll-mt-20 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Upload size={20} className="mr-2" />
              Upload PDF
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm p-6">
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white/80 backdrop-blur-sm">
                <FileText size={48} className="mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Upload your PDF document</h3>
                <p className="text-gray-500 mb-4">PDF files will be processed to create flashcards</p>
                <div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <button
  onClick={() => fileInputRef.current.click()}
  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
>
  {uploadStatus}
</button> 

                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-4 shadow-sm">
                  <div className="flex items-center">
                    <FileText size={24} className="text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
                <button
                  onClick={handleFileUpload}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
                >
                  Upload PDF
                </button>
              </div>
            )}
          </div>

          {userData.recentPdfs.length > 0 && (
            <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
                <h3 className="font-medium text-gray-800">Recent Uploads</h3>
              </div>
              {userData.recentPdfs.map((pdf) => (
                <div key={pdf.id} className="px-6 py-4 border-b border-gray-100 last:border-b-0 flex justify-between items-center hover:bg-blue-50/50 transition">
                  <div className="flex items-center">
                    <FileText size={18} className="text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">{pdf.title}</p>
                      <p className="text-sm text-gray-500">Uploaded on {pdf.date} • {pdf.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/dashboard/flashcards/${pdf.id}`)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md hover:opacity-90 transition-opacity text-sm shadow-sm"
                  >
                    View Cards
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* My Flashcards Section */}
        <section
          ref={flashcardsSectionRef}
          id="flashcards-section"
          className="scroll-mt-20 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <BookOpen size={20} className="mr-2" />
              My Flashcards
            </h2>
            <Link
              to="/dashboard/flashcards"
              className="bg-blue-600 text-white text-sm flex items-center px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              View All Flashcards <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData.recentDecks.map((deck) => (
              <div key={deck.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md overflow-hidden border border-white/50 transition-transform hover:scale-105">
                <div className="p-5">
                  <h3 className="font-medium text-gray-800 mb-1">{deck.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{deck.cardCount} cards • Last studied: {deck.lastStudied}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: `${deck.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">{deck.progress}% complete</span>
                    <Link to={`/dashboard/flashcards/${deck.id}`} className="text-sm text-blue-600 hover:underline font-medium">
                      Study now
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Deck Card */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-md overflow-hidden border border-white/50 transition-transform hover:scale-105">
              <Link to="/dashboard/flashcards/create" className="p-5 flex flex-col items-center justify-center h-full text-center">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full mb-3 shadow-md">
                  <Plus size={24} />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Create New Deck</h3>
                <p className="text-sm text-gray-500">Create flashcards manually</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Progress Tracking Section */}
        <section
          ref={progressSectionRef}
          id="progress-section"
          className="scroll-mt-20 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <BarChart2 size={20} className="mr-2" />
              Progress Tracking
            </h2>
            <Link
              to="/dashboard/progress"
              className="bg-blue-600 text-white text-sm flex items-center px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              View Detailed Stats <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Study Streak & Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800">Study Overview</h3>
                <Link
                  to="/dashboard/progress"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  View All Stats
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Streak:</span>
                  <span className="font-medium text-gray-800">{userData.streak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Cards Studied:</span>
                  <span className="font-medium text-gray-800">{userData.cardsStudied}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Time:</span>
                  <span className="font-medium text-gray-800">{userData.timeSpent} hrs</span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md p-6">
              <h3 className="font-medium text-gray-800 mb-4">Study Timer</h3>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2">
                </div>
                <div className="absolute top-0 right-0 text-xs text-gray-500">{studyTime}s</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);
}