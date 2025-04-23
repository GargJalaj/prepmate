import { useState, useEffect } from "react";

export default function Flashcards() {
  const dummyFlashcards = [
    {
      front: { type: "heading", content: "What is AI?" },
      back: { type: "text", content: "AI is the simulation of human intelligence in machines that are programmed to think and learn." }
    },
    {
      front: { type: "heading", content: "Types of AI" },
      back: { type: "list", content: ["Narrow AI", "General AI", "Superintelligent AI"] }
    },
    {
      front: { type: "heading", content: "Gradient Descent Formula" },
      back: { type: "equation", content: "θ = θ - α ∇J(θ)" }
    },
    {
      front: { type: "heading", content: "Overfitting" },
      back: { type: "text", content: "Overfitting occurs when a model learns the training data too well, leading to poor generalization." }
    }
  ];
  
  

  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/flashcards");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setFlashcards(data);
        } else {
          setFlashcards(dummyFlashcards);
        }
      } catch (err) {
        console.error("Error fetching flashcards:", err);
        setFlashcards(dummyFlashcards); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  useEffect(() => {
    if (!timerRunning || currentIndex === flashcards.length - 1) {
      setTimerRunning(false);
      return;
    }

    const timer = setInterval(() => setTotalTime((prev) => prev + 1), 1000);

    return () => clearInterval(timer);
  }, [timerRunning, currentIndex, flashcards.length]);

  const nextFlashcard = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setTimerRunning(false); // Stop timer on last flashcard
    }
  };

  const prevFlashcard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const currentFlashcard = flashcards[currentIndex];
  const formattedTime = new Date(totalTime * 1000).toISOString().substr(14, 5);

  const renderBackContent = (back) => {
    switch (back.type) {
      case "text":
        return <p className="text-gray-700 text-lg">{back.content}</p>;
      case "list":
        return (
          <ul className="list-disc list-inside text-left text-gray-700">
            {back.content.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      case "equation":
        return (
          <p className="text-xl font-mono bg-gray-200 p-3 rounded">
            {back.content}
          </p>
        );
      default:
        return <p className="text-gray-700">Unknown content</p>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-xl">
        Loading flashcards...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
      {/* Progress Bar */}
      <div className="fixed top-7 left-1/2 transform -translate-x-1/2 w-3/4 bg-gray-300 h-2 rounded-full overflow-hidden">
        <div
          className="bg-gray-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
        ></div>
      </div>

      <h1 className="text-4xl font-extrabold text-white mb-8">Flashcards</h1>

      {/* Counter */}
      <div className="mb-4 text-white">
        Card {currentIndex + 1} of {flashcards.length}
      </div>

      {/* Flashcard */}
      <div 
  onClick={flipCard}
  className="relative w-96 h-64 perspective cursor-pointer mb-8"
>
  <div className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
    {/* Front */}
    <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-white via-gray-100 to-blue-200 p-6 rounded-xl shadow-2xl flex items-center justify-center text-center">
      {currentFlashcard.front.type === "heading" && (
        <h2 className="text-2xl font-bold text-blue-700">{currentFlashcard.front.content}</h2>
      )}
    </div>

    {/* Back */}
    <div className="absolute w-full h-full backface-hidden bg-blue-100 p-6 rounded-xl shadow-2xl transform rotate-y-180 flex items-center justify-center text-center">
      {currentFlashcard.back.type === "text" && (
        <p className="text-gray-700 text-lg">{currentFlashcard.back.content}</p>
      )}
      {currentFlashcard.back.type === "list" && (
        <ul className="list-disc list-inside text-left text-gray-700">
          {currentFlashcard.back.content.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
      {currentFlashcard.back.type === "equation" && (
        <p className="text-xl font-mono bg-gray-200 p-3 rounded">{currentFlashcard.back.content}</p>
      )}
    </div>
  </div>
</div>


      <div className="text-white text-sm mb-4">Click card to flip</div>

      {/* Buttons */}
      <div className="mt-4 flex justify-center gap-6">
        <button
          onClick={prevFlashcard}
          disabled={currentIndex === 0}
          className={`px-8 py-3 rounded-lg text-white transition ${currentIndex === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          Previous
        </button>

        <button
          onClick={nextFlashcard}
          disabled={currentIndex === flashcards.length - 1}
          className={`px-8 py-3 rounded-lg text-white transition ${currentIndex === flashcards.length - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          Next
        </button>
      </div>

      {/* Timer at Bottom-Right */}
      <div className="fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center">
        <span className="mr-2">⏳</span> {formattedTime}
      </div>
    </div>
  );
}