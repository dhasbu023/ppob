import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">History Page</h1>

      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Kembali
      </button>
    </div>
  );
}