import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getTransactions, deleteTransaction } from "../services/api";

import Table from "../components/Table";
import MonthlyIncomeChart from "../components/MonthlyIncomeChart";
import MonthlyProfitCard from "../components/MonthlyProfitCard";
import TransactionFilters from "../components/TransactionFilters";
import ConfirmModal from "../components/ConfirmModal";
import TableSkeleton from "../components/TableSkeleton";

export default function History() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("");

  // SEARCH STATE
  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // FETCH DATA
  // =========================
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
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN DELETE MODAL
  // =========================
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // =========================
  // CONFIRM DELETE
  // =========================
  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      const res = await deleteTransaction(deleteId);

      if (res?.status === "ok") {
        setData((prev) =>
          prev.filter(
            (item) =>
              item.ID !== deleteId &&
              item.id !== deleteId
          )
        );

        setShowDeleteModal(false);
        setDeleteId(null);
      } else {
        alert("Gagal menghapus transaksi");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus");
    } finally {
      setDeleteLoading(false);
    }
  };

  // =========================
  // FILTER DATA
  // =========================
  const filteredData = data.filter((item) => {
    const namaProduk = String(
      item.Jenis ||
        item.jenis ||
        item.Nama ||
        item.nama ||
        ""
    ).toLowerCase();

    const keyword = (search || "")
      .toLowerCase()
      .trim();

    // FILTER SEARCH
    if (
      keyword &&
      !namaProduk.includes(keyword)
    ) {
      return false;
    }

    const date = new Date(
      item.Tanggal || item.tanggal
    );

    const now = new Date();

    // FILTER HARI INI
    if (filter === "daily") {
      return (
        date.toDateString() ===
        now.toDateString()
      );
    }

    // FILTER BULAN INI
    if (filter === "monthly") {
      return (
        date.getMonth() ===
          now.getMonth() &&
        date.getFullYear() ===
          now.getFullYear()
      );
    }

    // FILTER TAHUN INI
    if (filter === "yearly") {
      return (
        date.getFullYear() ===
        now.getFullYear()
      );
    }

    // FILTER RANGE TANGGAL
    if (
      filter === "range" &&
      startDate &&
      endDate
    ) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      end.setHours(
        23,
        59,
        59,
        999
      );

      return (
        date >= start &&
        date <= end
      );
    }

    // FILTER BULAN TERTENTU
    if (
      filter === "month" &&
      month
    ) {
      const [y, m] =
        month.split("-");

      return (
        date.getFullYear() ===
          Number(y) &&
        date.getMonth() ===
          Number(m) - 1
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
            <h1 className="text-xl font-bold">
              Riwayat Transaksi
            </h1>
          </div>

          <button
            onClick={() =>
              navigate("/")
            }
            className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-xl flex items-center gap-2 transition"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
        </div>

        {/* FILTER */}
        <TransactionFilters
          filter={filter}
          setFilter={setFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          month={month}
          setMonth={setMonth}
          search={search}
          setSearch={setSearch}
        />

        {/* CONTENT */}
        <div className="mt-5 flex flex-col lg:flex-row gap-4">

          {/* TABLE */}
          <div className="w-full lg:w-[70%]">
            {loading ? (
              <TableSkeleton />
            ) : (
              <Table
                data={filteredData}
                onDelete={handleDelete}
              />
            )}
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[30%] flex flex-col gap-4">
            <MonthlyProfitCard
              data={data}
            />
            <MonthlyIncomeChart
              data={data}
            />
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <ConfirmModal
        open={showDeleteModal}
        loading={deleteLoading}
        title="Hapus Transaksi"
        message="Data yang sudah dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus transaksi ini?"
        onCancel={() => {
          setShowDeleteModal(
            false
          );
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}