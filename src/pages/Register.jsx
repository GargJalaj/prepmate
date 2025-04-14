import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        
        <form className="mt-4">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded-md mb-2" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded-md mb-2" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded-md mb-2" />

          <button type="submit" className="w-full py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}
