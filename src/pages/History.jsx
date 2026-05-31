import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getTransactions, deleteTransaction } from "../services/api";

import Table from "../components/Table";
import MonthlyIncomeChart from "../components/MonthlyIncomeChart";
import MonthlyProfitCard from "../components/MonthlyProfitCard";
import TransactionFilters from "../components/TransactionFilters";

export default function History() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getTransactions();

      if (Array.isArray(res)) setData(res);
      else if (Array.isArray(res?.data)) setData(res.data);
      else setData([]);
    } catch (err) {
      console.log(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus transaksi ini?")) return;

    try {
      await deleteTransaction(id);
      setData((prev) => prev.filter((item) => item.ID !== id));
    } catch (err) {
      alert("Gagal hapus!");
    }
  };

  // =========================
  // FILTER LOGIC
  // =========================
  const filteredData = data.filter((item) => {
    const date = new Date(item.Tanggal || item.tanggal);
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

    if (filter === "range" && startDate && endDate) {
      return date >= new Date(startDate) && date <= new Date(endDate);
    }

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
      <div className="max-w-6xl mx-auto">

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

        {/* FILTER COMPONENT */}
        <TransactionFilters
          filter={filter}
          setFilter={setFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          month={month}
          setMonth={setMonth}
        />

        {/* DASHBOARD */}
        <div className="mt-5 flex flex-col lg:flex-row gap-4">

          {/* LEFT - TABLE */}
          <div className="w-full lg:w-[70%]">
            {loading ? (
              <p className="text-center text-gray-400">Loading...</p>
            ) : (
              <Table data={filteredData} onDelete={handleDelete} />
            )}
          </div>

          {/* RIGHT - PANEL */}
          <div className="w-full lg:w-[30%] flex flex-col gap-4">
            <MonthlyProfitCard data={data} />
            <MonthlyIncomeChart data={data} />
          </div>

        </div>

      </div>
    </div>
  );
}