"use client";

import { useRef, useState } from "react";

export default function UploadForm() {
  const fileInputRef = useRef(null);
  // Declare possible states -> value to read ; function to update it
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState(null);
  const [analyzedText, setAnalyzedText] = useState(null);

  async function uploadFile(file) {
    try {
      setError(null);

      // Check if file already exists (duplicate)
      // Doesn't really handle the issue, just outputs different error code
      const exists = await checkFileExists(file.name);
      if (exists) {
        setError(`You already uploaded "${file.name}"`);
      } else {
        setIsUploading(true);

        // formData is a built-in js object that packaegs data like an HTML form would
        // it holds data in the EXACT way that web servers expect.
        const form = new FormData();
        // append the form with a file and label is "file"
        form.append("file", file); // must match formData.get('file') in API route

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: form,
        });
        if (!uploadResponse.ok) {
          throw new Error(`Upload failed (${uploadResponse.status})`);
        }

        // Blob parsing: this line reads the servers (API route) JSON response.
        const blob = await uploadResponse.json();
        setUploadedUrl(blob.url || null);

        setIsProcessing(true);
        const transcribeResponse = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            audioUrl: blob.url,
            originalFilename: file.name,
          }),
        });
        if (!transcribeResponse.ok) {
          throw new Error(
            `Transcription failed (${transcribeResponse.status})`
          );
        }
        const data = await transcribeResponse.json();
        setTranscribedText(data.text);
      }
    } catch (e) {
      setUploadedUrl(null);
      setError(e?.message || "Upload failed");
    } finally {
      // runs even if error is thrown
      setIsUploading(false);
      setIsProcessing(false);
      // This line clears the input's value so selecting the same file again triggers `onChange`
      // "If a file is being referenced, set it to blank"
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function checkFileExists(filename) {
    const response = await fetch("/api/upload");
    const existingFiles = await response.json();
    // Return truthy value: .some is a js method to check if a file already exists
    return existingFiles.some((blob) => blob.pathname == filename);
  }

  // Triggers when button is clicked
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
        } catch {}
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
        <>
          <figure>
            <audio controls src={uploadedUrl}></audio>
            <a href={uploadedUrl}></a>
          </figure>
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
        </>
      )}
    </div>
  );
}
