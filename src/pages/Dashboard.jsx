// ==============================
// PPOB APP (React + Tailwind + Router)
// ==============================

import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// ==============================
// pages/Dashboard.jsx
// ==============================
function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow mb-4">
          <h1 className="text-2xl font-bold text-center text-blue-600">
            📊 Dashboard PPOB
          </h1>
          <p className="text-center text-gray-500">
            Sistem pencatatan penjualan sederhana
          </p>
        </div>

        {/* MENU */}
        <div className="grid grid-cols-1 gap-3">

          <button
            onClick={() => navigate("/input")}
            className="bg-blue-600 text-white p-4 rounded-xl text-lg font-semibold"
          >
            ➕ Input Transaksi
          </button>

          <button
            onClick={() => navigate("/history")}
            className="bg-green-600 text-white p-4 rounded-xl text-lg font-semibold"
          >
            📋 Riwayat Transaksi
          </button>

        </div>

        {/* SUMMARY CARD (dummy sementara) */}
        <div className="mt-5 bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold mb-2">Ringkasan</h2>
          <p>Total Transaksi: 0</p>
          <p>Total Profit: Rp0</p>
        </div>

      </div>
    </div>
  );
}

// ==============================
// pages/Input.jsx (placeholder dulu)
// ==============================
function Input() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Input Page</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

// ==============================
// pages/History.jsx (placeholder dulu)
// ==============================
function History() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">History Page</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

// ==============================
// APP ROUTER
// ==============================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/input" element={<Input />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
