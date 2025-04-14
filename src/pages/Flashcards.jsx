import { useState, useEffect } from "react";

export default function Flashcards() {
  const dummyFlashcards = [
    {
      content: [
        { type: "heading", content: "Big Data and AI" },
        { type: "list", content: ["Data Science involves statistics and machine learning.", "Python and R are widely used."] },
        { type: "equation", content: "E = mc^2" }
      ]
    },
    {
      content: [
        { type: "heading", content: "Machine Learning" },
        { type: "text", content: "Machine learning is a subset of AI that enables systems to learn from data." }
      ]
    },
    {
      content: [
        { type: "heading", content: "Python Basics" },
        { type: "text", content: "Python is a widely-used programming language." },
        { type: "list", content: ["Simple syntax", "Huge libraries", "Great for AI and Data Science"] }
      ]
    }
  ];

  const [flashcards] = useState(dummyFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if (!timerRunning || currentIndex === flashcards.length - 1) {
      setTimerRunning(false); // Stop timer on last flashcard
      return;
    }
  
    const timer = setInterval(() => setTotalTime((prev) => prev + 1), 1000);
    
    return () => clearInterval(timer);
  }, [timerRunning, currentIndex, flashcards.length]); // ✅ Added flashcards.length
  
  
  const nextFlashcard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setTimerRunning(false); // Stop timer on last flashcard
    }
  };
  

  const prevFlashcard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 relative">
      {/* Progress Bar */}
      <div className="fixed top-7 left-55 w-3/4 bg-gray-300 h-3 rounded-full overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all"
          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
        ></div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Flashcards</h1>

      <div className="bg-white shadow-lg p-6 rounded-lg w-96 text-center">
        {currentFlashcard.content.map((item, index) => (
          <div key={index} className="mb-2">
            {item.type === "heading" && <h2 className="text-2xl font-bold">{item.content}</h2>}
            {item.type === "list" && (
              <ul className="list-disc list-inside text-left">
                {item.content.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
            {item.type === "equation" && <p className="text-lg font-mono">{item.content}</p>}
            {item.type === "text" && <p className="text-gray-700">{item.content}</p>}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={prevFlashcard}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-lg text-white transition ${
            currentIndex === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        <button
          onClick={nextFlashcard}
          disabled={currentIndex === flashcards.length - 1}
          className={`px-6 py-3 rounded-lg text-white transition ${
            currentIndex === flashcards.length - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      {/* Timer at Bottom-Right */}
      <p className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg">
        ⏳ {totalTime} sec
      </p>
    </div>
  );
}
