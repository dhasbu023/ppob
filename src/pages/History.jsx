import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Filter, Trash2 } from "lucide-react";
import { getTransactions, deleteTransaction } from "../services/api";
import Table from "../components/Table";

export default function History() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // 🔥 FILTER TAMBAHAN
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("");

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getTransactions();

      if (Array.isArray(res)) {
        setData(res);
      } else if (Array.isArray(res?.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.log(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus transaksi ini?")) return;

    try {
      await deleteTransaction(id);
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal hapus!");
    }
  };

  // =========================
  // FILTER DATA
  // =========================
  const filteredData = data.filter((item) => {
    const date = new Date(item.tanggal);
    const now = new Date();

    if (filter === "daily") {
      return date.toDateString() === now.toDateString();
    }

    if (filter === "monthly") {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }

    if (filter === "yearly") {
      return date.getFullYear() === now.getFullYear();
    }

    // 🔥 FILTER RANGE
    if (filter === "range" && startDate && endDate) {
      return (
        date >= new Date(startDate) &&
        date <= new Date(endDate)
      );
    }

    // 🔥 FILTER PER BULAN CUSTOM
    if (filter === "month" && month) {
      const [y, m] = month.split("-");
      return (
        date.getFullYear() === Number(y) &&
        date.getMonth() === Number(m) - 1
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} />
            <h1 className="text-xl font-bold">Riwayat Transaksi</h1>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 px-3 py-2 rounded-xl flex gap-2"
          >
            <ArrowLeft size={16} /> Kembali
          </button>
        </div>

        {/* FILTER BUTTON */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {["all", "daily", "monthly", "yearly", "range", "month"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-sm ${
                filter === f ? "bg-blue-600" : "bg-gray-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* FILTER INPUT */}
        {filter === "range" && (
          <div className="flex gap-2 mt-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-800 p-2 rounded"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-800 p-2 rounded"
            />
          </div>
        )}

        {filter === "month" && (
          <div className="mt-3">
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-gray-800 p-2 rounded"
            />
          </div>
        )}

        {/* TABLE */}
        <div className="mt-4">
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : (
            <Table data={filteredData} onDelete={handleDelete} />
          )}
        </div>

      </div>
    </div>
  );
}
