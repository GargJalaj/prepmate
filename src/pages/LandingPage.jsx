import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


export default function LandingPage() {
  const titleRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hide scroll indicator when scrolled to the bottom
      if (scrollPosition >= documentHeight - 1) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.document.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateY = Math.max(0, 50 - offset / 10);
  const stickyReached = offset > 400;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen overflow-x-hidden relative">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 flex justify-between items-center relative z-40">
        <button
          className="fixed right-4 text-black-700 text-3xl"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-30 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 transform transition-transform duration-300 z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="text-gray-700 text-xl mb-4"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>
        <nav className="flex flex-col space-y-4">
          <Link to="/register" className="text-gray-700 hover:underline" onClick={() => setIsMenuOpen(false)}>
            Register
          </Link>
          <Link to="/login" className="text-gray-700 hover:underline" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        </nav>
      </div>

      {/* Sticky Animated Title */}
      <div
        ref={titleRef}
        className={`w-full fixed top-0 left-0 flex justify-center z-30 transition-all duration-500 ease-in-out ${
          stickyReached ? "bg-gradient-to-r from-purple-600 to-blue-500 py-4" : "bg-gradient-to-r from-purple-600 to-blue-500"
        }`}
        style={{
          transform: `translateY(${stickyReached ? 0 : translateY}vh)`,
          transition: "transform 0.1s ease-in-out",
        }}
      >
        <h1
          className={`bg-clip-text text-transparent bg-gradient-to-r from-[#5EFFFC] via-[#5D9CFF] to-[#B266FF] font-extrabold tracking-tight transition-all duration-200 ease-in-out ${
            stickyReached ? "text-5xl" : "text-8xl"
          } shimmer-text`}
          style={{
            transition: "font-size 0.3s ease-in-out",
            WebkitTextStroke: "0.2px rgba(255, 255, 255, 0.3)",
          }}
        >
          Prepmate
        </h1>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-600 to-transparent pointer-events-none z-10" />

      {/* Spacer to simulate scroll */}
      <div id="hero" className="h-[100vh]" />

      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <h2 className="text-4xl font-bold">Turn PDFs into Smart Flashcards</h2>
        <p className="mt-4 text-lg">Focus on learning, let us handle the prep.</p>
        <Link
          to="/register"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-200"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 pt-20 pb-10">
        <h2 className="text-3xl font-bold text-center mb-8">Why Prepmate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard title="AI-Powered" desc="Automatically extracts key concepts from your PDFs." />
          <FeatureCard title="Customizable" desc="Edit, organize, and personalize your flashcards." />
          <FeatureCard title="Fast & Efficient" desc="Save hours of manual work with AI-generated cards." />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-blue-50 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">How It Works</h2>
        <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <FeatureCard title="1. Upload PDF" desc="Drag & drop your study material easily." />
          <FeatureCard title="2. AI Processes It" desc="We extract key points, definitions, and concepts." />
          <FeatureCard title="3. Get Flashcards" desc="Review, revise, and retain — faster than ever." />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">What Students Say</h2>
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <Testimonial name="Alex" quote="This tool literally saved my finals prep!" />
          <Testimonial name="Riya" quote="I love how fast and accurate it is!" />
        </div>
      </section>

      {/* Call to Action */}
      <section id="call-to-action" className="bg-blue-500 py-16 text-white text-center">
        <h2 className="text-3xl font-bold">Start Learning Smarter Today</h2>
        <p className="mt-4">Join thousands of students using AI to streamline their study process.</p>
        <Link
          to="/register"
          className="mt-6 inline-block bg-white text-blue-500 px-6 py-2 rounded-md font-semibold hover:bg-gray-200"
        >
          Sign Up for Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>© 2025 Prepmate. All Rights Reserved.</p>
      </footer>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
          <span className="text-white text-sm opacity-80 animate-bounce mb-1 tracking-wide">Scroll Down</span>
          <svg
            className="w-6 h-6 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  );
}

function Testimonial({ name, quote }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-700 italic">“{quote}”</p>
      <p className="mt-4 font-semibold text-gray-800">- {name}</p>
    </div>
  );
}
