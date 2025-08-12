"use client";

import { useRef, useState } from "react";

export default function UploadForm() {
  // Create a reference to the file input element
  // https://react.dev/reference/react/useRef
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);


  // Function to trigger file input click
  const handleBtnClick = () => {
    fileInputRef.current.click();
  };


  // Function to handle file selection
  const handleFileChange = (event) => {
    // Default select first file?
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0])
    // If there is a file
    if (file) {
      // Verify file is an audio file
      if (file.type.startsWith("audio/")) {
        console.log("\nSelected audio file:", file);
        // Add file handling logic here (e.g., upload to blob)
      } else {
        alert("Please select and audio file (e.g., MP3, WAV, M4A)");
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
        onClick={(handleBtnClick)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Upload Audio
      </button>

    </div>
  );
}
