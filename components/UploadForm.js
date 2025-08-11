"use client";

export default function UploadForm() {
  return (
    <div>
      <button
        onClick={() => console.log("Button clicked!")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Upload
      </button>
    </div>
  );
}
