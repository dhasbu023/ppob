import {
  Loader2,
  PlusCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SubmitButton({
  loading,
}) {
  return (
    <motion.button
      whileHover={{
        scale: loading ? 1 : 1.02,
      }}
      whileTap={{
        scale: loading ? 1 : 0.98,
      }}
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed p-3 rounded-xl flex justify-center items-center gap-2 font-semibold shadow-lg"
    >
      {loading ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          Menyimpan...
        </>
      ) : (
        <>
          <PlusCircle size={18} />
          Simpan Transaksi
        </>
      )}
    </motion.button>
  );
}