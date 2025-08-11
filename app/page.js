import UploadForm from "../components/UploadForm";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Hanasu AI Language Coach</h1>
      <p className="mt-2 text-gray-600">Your MVP frontend is starting to take shape!</p>

      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Upload Your Audio</h2>
        <UploadForm />
      </div>
    </main>
  );
}