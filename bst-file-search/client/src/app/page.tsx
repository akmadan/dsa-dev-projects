"use client";

import { useState } from "react";

interface SearchResult {
  success: boolean;
  message?: string;
  data?: {
    path: string;
    size: string;
     
  };
}

interface UploadStatus {
  success: boolean;
  message: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);

  // Handle file search
  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:3001/search?key=${query}`);
      const data: SearchResult = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult({ success: false, message: "Error searching file." });
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
      const data: UploadStatus = await res.json();
      setUploadStatus(data);
      setFile(null); // Reset the file input
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus({ success: false, message: "Error uploading file." });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-12 bg-gray-100 rounded-lg shadow-md font-sans">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">File Search & Upload System</h1>

      {/* File Search Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Search for a File</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter file name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
        {result && (
          <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
            {result.success ? (
              <div>
                <h3 className="text-green-600 font-semibold">File Found:</h3>
                <p className="text-gray-700"><strong>Path:</strong> {result.data?.path}</p>
                <p className="text-gray-700"><strong>Size:</strong> {result.data?.size}</p>
              </div>
            ) : (
              <p className="text-red-600">{result.message}</p>
            )}
          </div>
        )}
      </div>

      {/* File Upload Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Upload a File</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Upload
        </button>
        {uploadStatus && (
          <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
            {uploadStatus.success ? (
              <p className="text-green-600">{uploadStatus.message}</p>
            ) : (
              <p className="text-red-600">{uploadStatus.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
