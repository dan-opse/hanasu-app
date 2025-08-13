"use client";

import { useRef, useState } from "react";

export default function UploadForm() {
  // Create a reference to the file input element, which is ...
  // https://react.dev/reference/react/useRef
  const fileInputRef = useRef(null);
  // Declare possible states -> value to read ; function to update it
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  async function uploadFile(file) {
    try {
      setError(null);
      setIsUploading(true);

      // formData is a built-in js object that packaegs data like an HTML form would
      // it holds data in the EXACT way that web servers expect.
      const form = new FormData();
      // append the form with a file and label is "file"
      form.append("file", file); // must match formData.get('file') in API route

      // Connect with API route:
      // POST is a HTTP request method for sending data to a server (API route)
      // The body is the content (data being sent)
      const response = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      // Check if the server responded successfully
      // Server side code doesn't handle duplicate filename collisions gracefully
      if (!response.ok) {
        throw new Error(`Upload failed (${response.status})`);
      }

      // Blob parsing: this line reads the servers (API route) JSON response.
      const blob = await response.json(); // @vercel/blob returns { url, pathname, ... as JSON
      // This saves the blob's URL in state so UI can show "Uploaded:" link.
      setUploadedUrl(blob.url || null);
    } catch (e) {
      setUploadedUrl(null);
      setError(e?.message || "Upload failed");
    } finally {
      setIsUploading(false);
      // allow re-selecting the same file to trigger onChange again
      // `fileInputRef` points to hidden file input.
      // when you click the button, `fileInputRef.current.click()` (line 59)
      // programmatically clicks the hidden input, opening the file picker.
      // This line clears the input's value so selecting the same file again triggers `onChange`
      // "If a file is being referenced, set it to blank"
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // Triggers when button is clicked
  // opens the file picker
  const handleBtnClick = () => {
    // click the hidden file input, like an invisible cursor
    fileInputRef.current.click();
  };

  // Triggers when a file is uploaded / changed
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


  // JSX return section
  return (
    <div>
      {/* Hidden file input with audio file restrictions */}

      <input
        // this input area is where the file picker is opened
        type="file"
        ref={fileInputRef}
        // when user selects a file, onChange fires and triggers handleFileChange
        onChange={handleFileChange}
        accept="audio/*" // Restricts to only audio files
        style={{ display: "none" }} // Hide defualt file input
      />

      <button
        onClick={handleBtnClick}
        disabled={isUploading}
        aria-busy={isUploading}
        className={`px-4 py-2 rounded text-white ${
          isUploading
            ? "bg-pink-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isUploading ? "Uploading..." : "Upload Audio"}
      </button>

      {error && <p className="mt-2 text-red-600">{error}</p>}
      {uploadedUrl && (
        <p className="mt-2 text-green-600">
          Uploaded:{" "}
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {selectedFile.name}
          </a>
        </p>
      )}
    </div>
  );
}
