import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, History, Package, TrendingUp, Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getTransactions();
      setData(Array.isArray(result) ? result : []);
    }
    fetchData();
  }, []);

  const safeData = Array.isArray(data) ? data : [];

  // =========================
  // HITUNG DATA
  // =========================
  const totalTransaksi = safeData.length;

  const totalProfit = safeData.reduce((acc, item) => {
    return acc + Number(item?.Profit || 0);
  }, 0);

  const totalPenjualan = safeData.reduce((acc, item) => {
    return acc + Number(item?.Jual || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center">
            📊 Dashboard PPOB
          </h1>
          <p className="text-center text-gray-400 text-sm mt-1">
            Ringkasan pencatatan transaksi
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4 rounded-2xl flex items-center gap-3 border border-gray-800"
          >
            <Package />
            <div>
              <p className="text-gray-400 text-sm">Transaksi</p>
              <h2 className="text-xl font-bold">{totalTransaksi}</h2>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4 rounded-2xl flex items-center gap-3 border border-gray-800"
          >
            <TrendingUp />
            <div>
              <p className="text-gray-400 text-sm">Profit</p>
              <h2 className="text-xl font-bold text-green-400">
                Rp {totalProfit}
              </h2>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4 rounded-2xl flex items-center gap-3 border border-gray-800"
          >
            <Receipt />
            <div>
              <p className="text-gray-400 text-sm">Penjualan</p>
              <h2 className="text-xl font-bold">
                Rp {totalPenjualan}
              </h2>
            </div>
          </motion.div>

        </div>

        {/* MENU */}
        <div className="grid gap-3 mt-6">

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate("/input")}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl text-lg font-semibold shadow-lg"
          >
            <Plus /> Input Transaksi
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate("/history")}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition p-4 rounded-2xl text-lg font-semibold shadow-lg"
          >
            <History /> Riwayat
          </motion.button>

        </div>

      </div>
    </div>
  );
}