import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function StatusModal({
  open,
  type,
  message,
  onClose,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
        >
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
            }}
            className="bg-gray-900 border border-gray-700 p-6 rounded-2xl w-80 text-center shadow-2xl"
          >
            <div className="flex justify-center mb-3">
              {type ===
              "success" ? (
                <CheckCircle2
                  size={60}
                  className="text-green-400"
                />
              ) : (
                <XCircle
                  size={60}
                  className="text-red-400"
                />
              )}
            </div>

            <h2
              className={`text-xl font-bold mb-2 ${
                type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {type === "success"
                ? "Berhasil"
                : "Gagal"}
            </h2>

            <p className="text-gray-300 mb-5">
              {message}
            </p>

            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl py-3 font-medium"
            >
              Tutup
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}