import { useState } from "react";
import Flashcards from "./Flashcards";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    // Simulate upload success
    setTimeout(() => {
      setUploaded(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {!uploaded ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Upload Your PDF</h1>
          <label className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Select File
            <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
          </label>

          {/* Show PDF Name if Selected */}
          {file && (
            <p className="mt-4 text-green-600 font-semibold">📄 {file.name}</p>
          )}

          {file && (
            <button
              onClick={handleUpload}
              className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Upload File
            </button>
          )}
        </>
      ) : (
        <Flashcards />
      )}
    </div>
  );
}
