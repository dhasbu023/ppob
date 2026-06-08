import { motion } from "framer-motion";

export default function ProfitCard({
  profit,
}) {
  return (
    <motion.div
      animate={{
        scale: profit > 0 ? 1.02 : 1,
      }}
      className="bg-gray-950 border border-gray-800 p-4 rounded-xl text-center"
    >
      <p className="text-sm text-gray-400">
        Estimasi Profit
      </p>

      <p
        className={`text-2xl font-bold mt-1 ${
          profit >= 0
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        Rp{" "}
        {new Intl.NumberFormat(
          "id-ID"
        ).format(profit)}
      </p>
    </motion.div>
  );
}