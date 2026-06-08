import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function InputHeader({
  onBack,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mb-6"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700"
      >
        <ArrowLeft size={18} />
      </motion.button>

      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Input Transaksi
        </h1>

        <p className="text-xs text-gray-400">
          Tambahkan transaksi baru
        </p>
      </div>
    </motion.div>
  );
}