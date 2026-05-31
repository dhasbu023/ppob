import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  History,
  Package,
  TrendingUp,
  Receipt,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result =
          await getTransactions();

        setData(
          Array.isArray(result)
            ? result
            : []
        );
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const safeData = Array.isArray(data)
    ? data
    : [];

  const formatRupiah = (value) =>
    Number(value || 0).toLocaleString(
      "id-ID"
    );

  // =========================
  // HITUNG DATA
  // =========================
  const totalTransaksi =
    safeData.length;

  const totalProfit =
    safeData.reduce(
      (acc, item) =>
        acc +
        Number(item?.Profit || 0),
      0
    );

  const totalPenjualan =
    safeData.reduce(
      (acc, item) =>
        acc +
        Number(item?.Jual || 0),
      0
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl shadow-lg backdrop-blur-sm"
        >
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            📊 Dashboard PPOB
          </h1>

          <p className="text-center text-gray-400 text-sm mt-2">
            Ringkasan pencatatan
            transaksi dan profit
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4 mt-5">

          {loading ? (
            [...Array(3)].map(
              (_, i) => (
                <div
                  key={i}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-4 animate-pulse"
                >
                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-gray-800"></div>

                    <div className="flex-1">
                      <div className="h-3 bg-gray-800 rounded w-20 mb-2"></div>

                      <div className="h-6 bg-gray-800 rounded w-24"></div>
                    </div>

                  </div>
                </div>
              )
            )
          ) : (
            <>
              {/* TRANSAKSI */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                className="bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-2xl p-4 flex items-center gap-3 shadow-lg transition-all"
              >
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Package className="text-blue-400" />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Total
                    Transaksi
                  </p>

                  <h2 className="text-2xl font-bold">
                    {
                      totalTransaksi
                    }
                  </h2>
                </div>
              </motion.div>

              {/* PROFIT */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                className="bg-gray-900 border border-gray-800 hover:border-green-500/50 rounded-2xl p-4 flex items-center gap-3 shadow-lg transition-all"
              >
                <div className="p-3 rounded-xl bg-green-500/10">
                  <TrendingUp className="text-green-400" />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Total
                    Profit
                  </p>

                  <h2 className="text-xl font-bold text-green-400">
                    Rp{" "}
                    {formatRupiah(
                      totalProfit
                    )}
                  </h2>
                </div>
              </motion.div>

              {/* PENJUALAN */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                className="bg-gray-900 border border-gray-800 hover:border-purple-500/50 rounded-2xl p-4 flex items-center gap-3 shadow-lg transition-all"
              >
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Receipt className="text-purple-400" />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Total
                    Penjualan
                  </p>

                  <h2 className="text-xl font-bold">
                    Rp{" "}
                    {formatRupiah(
                      totalPenjualan
                    )}
                  </h2>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* MENU */}
        <div className="grid gap-4 mt-6">

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            whileHover={{
              scale: 1.03,
              y: -3,
            }}
            onClick={() =>
              navigate("/input")
            }
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl text-lg font-semibold shadow-lg"
          >
            <Plus size={22} />
            Input Transaksi
          </motion.button>

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            whileHover={{
              scale: 1.03,
              y: -3,
            }}
            onClick={() =>
              navigate("/history")
            }
            className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 transition p-4 rounded-2xl text-lg font-semibold shadow-lg"
          >
            <History size={22} />
            Riwayat
            Transaksi
          </motion.button>

        </div>

      </div>
    </div>
  );
}