"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [longURL, setLongUrl] = useState("");
  const [shortURL, setShortUrl] = useState("");
  const [generatedShortUrl, setGeneratedShortUrl] = useState("");
  const [retreivedLongUrl, setRetrievedLongUrl] = useState("");
  const [error, setError] = useState<any>("");

  const handleGenerateShortUrl = async () => {
    try {
      const response = await fetch("http://localhost:3001/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify({ originalURL: longURL }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setGeneratedShortUrl(data["data"]);
      } else {
        setError("Not generated");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleRetrieveLongUrl = async () => {
    try {
      const response = await fetch(`http://localhost:3001/${shortURL}`);
      const data = await response.json();
      if (response.ok) {
        setRetrievedLongUrl(data.data);
      } else {
        setError("not found");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 font-serif">
        Welcome to MicroUrl SaaS👋
      </h1>

      {/* Generate a new Short URL */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Generate Short URL</h2>

        <input
          type="text"
          placeholder="Enter Long URL"
          value={longURL}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
        />
        <button
          className="w-full mt-4 bg-blue-600 rounded-lg hover:bg-blue-700 text-white py-2"
          onClick={handleGenerateShortUrl}
        >
          Generate Short URL
        </button>

        {generatedShortUrl && (
          <p className="mt-4 text-green-400">
            Short URL: <a href={`/${generatedShortUrl}`} target="_blank">
              {generatedShortUrl}
            </a>
          </p>
        )}
      </div>

      {/* Retrieve Long URL */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Get your Long URL</h2>

        <input
          type="text"
          placeholder="Enter Short URL ID"
          value={shortURL}
          onChange={(e) => setShortUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
        />
        <button
          className="w-full mt-4 bg-red-600 rounded-lg hover:bg-red-700 text-white py-2"
          onClick={handleRetrieveLongUrl}
        >
          Get Long URL
        </button>

        {retreivedLongUrl && (
          <p className="mt-4 text-green-400">
            Long URL: <a href={`/${retreivedLongUrl}`} target="_blank">
              {retreivedLongUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
