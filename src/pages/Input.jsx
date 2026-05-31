import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addTransaction } from "../services/api";
import { ArrowLeft, PlusCircle, Wallet, Tag } from "lucide-react";

export default function Input() {
  const navigate = useNavigate();

  const [jenis, setJenis] = useState("");
  const [modal, setModal] = useState("");
  const [jual, setJual] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // ===== FORMAT RUPIAH =====
  const formatRupiah = (value) => {
    const number = value.replace(/\D/g, "");
    if (!number) return "";
    return "Rp " + new Intl.NumberFormat("id-ID").format(number);
  };

  const parseRupiah = (value) => {
    return Number(value.replace(/\D/g, ""));
  };

  // ===== PROFIT =====
  const profit =
    parseRupiah(jual || "0") - parseRupiah(modal || "0");

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jenis || !modal || !jual) {
      setModalType("error");
      setModalMessage("Semua field wajib diisi!");
      setShowModal(true);
      return;
    }

    const data = {
      source: "web",
      userId: "web",
      jenis: jenis,
      modal: parseRupiah(modal),
      jual: parseRupiah(jual),
    };

    try {
      setLoading(true);

      const res = await addTransaction(data);

      if (res.status === "ok") {
        setModalType("success");
        setModalMessage("Transaksi berhasil disimpan!");

        setJenis("");
        setModal("");
        setJual("");
      } else {
        throw new Error();
      }

    } catch (err) {
      setModalType("error");
      setModalMessage("Gagal menyimpan data!");
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white p-4">
      <div className="max-w-md mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold">Input Transaksi</h1>
        </div>

        {/* CARD */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* JENIS */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                <Tag size={14} /> Nama Produk
              </label>
              <input
                type="text"
                placeholder="contoh: pulsa 100k"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-800"
              />
            </div>

            {/* MODAL */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                <Wallet size={14} /> Harga Modal
              </label>
              <input
                type="text"
                placeholder="Rp 0"
                value={modal}
                onChange={(e) => setModal(formatRupiah(e.target.value))}
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-800"
              />
            </div>

            {/* JUAL */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                <Wallet size={14} /> Harga Jual
              </label>
              <input
                type="text"
                placeholder="Rp 0"
                value={jual}
                onChange={(e) => setJual(formatRupiah(e.target.value))}
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-800"
              />
            </div>

            {/* PROFIT */}
            <div className="bg-gray-950 border border-gray-800 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-400">Estimasi Profit</p>
              <p className="text-lg font-bold text-green-400">
                Rp {new Intl.NumberFormat("id-ID").format(profit)}
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-lg flex justify-center gap-2"
            >
              <PlusCircle size={18} />
              {loading ? "Menyimpan..." : "Simpan Transaksi"}
            </button>

          </form>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 p-6 rounded-xl w-80 text-center border border-gray-700">

            <h2 className={`text-lg font-bold mb-2 ${
              modalType === "success" ? "text-green-400" : "text-red-400"
            }`}>
              {modalType === "success" ? "Berhasil" : "Gagal"}
            </h2>

            <p className="text-gray-300 mb-4">{modalMessage}</p>

            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 px-4 py-2 rounded-lg w-full"
            >
              Tutup
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
