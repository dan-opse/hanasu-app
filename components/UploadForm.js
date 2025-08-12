"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";

export default function UploadForm() {
  // Create a reference to the file input element, which is ...
  // https://react.dev/reference/react/useRef
  const fileInputRef = useRef(null);
  // Setting states
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  async function uploadFile(file) {
    try {
      setError(null);
      setIsUploading(true);

      const form = new FormData();
      form.append("file", file); // must match formData.get('file') in API route

      // what is res?
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error(`Upload failed (${res.status})`);
      }

      const blob = await res.json(); // @vercel/blob returns { url, pathname, ...
      setUploadedUrl(blob.url || null);
    } catch (e) {
      setUploadedUrl(null);
      setError(e?.message || "Upload failed");
    } finally {
      setIsUploading(false);
      // allow re-selecting the same file to trigger onChange again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // Function to trigger file input click
  const handleBtnClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);

    if (file) {
      if (file.type.startsWith("audio/")) {
        try {
          await uploadFile(file);
        } catch {
          // error is already set in uploadFile
        }
      } else {
        alert("Please select an audio file (e.g., MP3, WAV, M4A)");
      }
    }
  };

  // Everything under this return statement is how the button appears on the website.
  // So the function above is really only handling the file upload.
  return (
    <div>
      {/* Hidden file input with audio file restrictions */}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/*" // Restricts to only audio files
        style={{ display: "none" }} // Hide defualt file input
      />

      <button
        onClick={handleBtnClick}
        disabled={isUploading}
        aria-busy={isUploading}
        className={`px-4 py-2 rounded text-white ${isUploading ? "bg-pink-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        {isUploading ? "Uploading..." : "Upload Audio"}
      </button>

      {error && <p className="mt-2 text-red-600">{error}</p>}
      {uploadedUrl && (
        <p className="mt-2 text-green-600">
            Uploaded:{" "}
            <a href={uploadedUrl} target="_blank" rel="noreferrer" className="underline">
                {uploadedUrl}
            </a>
        </p>
      )}
    </div>
  );
}
