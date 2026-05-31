import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  open,
  title = "Konfirmasi",
  message,
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95">

        <div className="flex justify-center mb-4">
          <div className="bg-red-500/20 p-4 rounded-full">
            <AlertTriangle
              size={32}
              className="text-red-400"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-center mb-2">
          {title}
        </h2>

        <p className="text-center text-gray-400 mb-6">
          {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition"
          >
            {loading ? "Menghapus..." : "Hapus"}
          </button>
        </div>

      </div>
    </div>
  );
}