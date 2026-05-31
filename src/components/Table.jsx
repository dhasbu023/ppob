import { useState } from "react";
import { updateTransaction } from "../services/api";

export default function Table({ data = [], onDelete }) {
  // =========================
  // EDIT STATE
  // =========================
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    jenis: "",
    jual: "",
    modal: "",
  });

  // =========================
  // FORMAT RUPIAH
  // =========================
  const formatRupiah = (num) => {
    const clean = Number(String(num).replace(/[^\d.-]/g, ""));
    if (isNaN(clean)) return "0";
    return new Intl.NumberFormat("id-ID").format(clean);
  };

  // =========================
  // FORMAT TANGGAL
  // =========================
  const formatTanggal = (dateString) => {
    try {
      const date = new Date(dateString);
      if (!date || isNaN(date)) return "-";

      return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "-";
    }
  };

  // =========================
  // START EDIT
  // =========================
  const handleEdit = (item) => {
    setEditId(item.ID);
    setEditForm({
      jenis: item.Jenis,
      jual: item.Jual,
      modal: item.Modal || "",
    });
  };

  // =========================
  // SAVE EDIT
  // =========================
  const handleSave = async (id) => {
    await updateTransaction(id, editForm);
    setEditId(null);
    window.location.reload(); // simpel refresh (nanti bisa upgrade state update)
  };

  // =========================
  // EMPTY STATE
  // =========================
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-6">
        Tidak ada data transaksi
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">

        {/* HEADER */}
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-3 text-left">Tanggal</th>
            <th className="p-3 text-left">Produk</th>
            <th className="p-3 text-left">Jual</th>
            <th className="p-3 text-left">Profit</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((item) => {
            const jual = Number(String(item?.Jual).replace(/[^\d.-]/g, ""));
            const profit = Number(String(item?.Profit).replace(/[^\d.-]/g, ""));

            const isEditing = editId === item.ID;

            return (
              <tr
                key={item.ID}
                className="border-t border-gray-800 hover:bg-gray-900 transition"
              >

                {/* TANGGAL */}
                <td className="p-3">
                  {formatTanggal(item?.Tanggal)}
                </td>

                {/* PRODUK */}
                <td className="p-3">
                  {isEditing ? (
                    <input
                      value={editForm.jenis}
                      onChange={(e) =>
                        setEditForm({ ...editForm, jenis: e.target.value })
                      }
                      className="bg-gray-800 p-1 rounded w-full"
                    />
                  ) : (
                    item?.Jenis || "-"
                  )}
                </td>

                {/* JUAL */}
                <td className="p-3">
                  {isEditing ? (
                    <input
                      value={editForm.jual}
                      onChange={(e) =>
                        setEditForm({ ...editForm, jual: e.target.value })
                      }
                      className="bg-gray-800 p-1 rounded w-full"
                    />
                  ) : (
                    `Rp ${formatRupiah(jual)}`
                  )}
                </td>

                {/* PROFIT */}
                <td className="p-3 text-green-400">
                  Rp {formatRupiah(profit)}
                </td>

                {/* ACTION */}
                <td className="p-3 text-center space-x-2">

                  {/* EDIT / SAVE */}
                  {isEditing ? (
                    <button
                      onClick={() => handleSave(item.ID)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-xs"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-lg text-xs"
                    >
                      Edit
                    </button>
                  )}

                  {/* DELETE */}
                  <button
                    onClick={() => onDelete?.(item.ID)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-xs"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}