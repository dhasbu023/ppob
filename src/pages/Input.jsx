import { useNavigate } from "react-router-dom";

export default function Input() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Input Page</h1>

      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Kembali
      </button>
    </div>
  );
}