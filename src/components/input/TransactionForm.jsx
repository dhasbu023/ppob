import { Wallet, Tag, Calendar } from "lucide-react";

import { motion } from "framer-motion";

import ProfitCard from "./ProfitCard";
import SubmitButton from "./SubmitButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TransactionForm({
  tanggal,
  setTanggal,
  jenis,
  setJenis,
  modal,
  setModal,
  jual,
  setJual,
  profit,
  loading,
  onSubmit,
  formatRupiah,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 shadow-xl"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* TANGGAL */}
        <div>
          <label className="text-sm text-gray-400 flex items-center gap-1 mb-1">
            <Calendar size={14} />
            Tanggal
          </label>

          <DatePicker
            selected={tanggal}
            onChange={(date) => setTanggal(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Pilih tanggal"
            className="w-full p-3 rounded-xl bg-gray-950 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white"
          />
        </div>

        {/* NAMA PRODUK */}
        <div>
          <label className="text-sm text-gray-400 flex items-center gap-1 mb-1">
            <Tag size={14} />
            Nama Produk
          </label>

          <input
            type="text"
            value={jenis}
            placeholder="Contoh: Pulsa 100K"
            onChange={(e) => setJenis(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-950 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>

        {/* HARGA MODAL */}
        <div>
          <label className="text-sm text-gray-400 flex items-center gap-1 mb-1">
            <Wallet size={14} />
            Harga Modal
          </label>

          <input
            type="text"
            value={modal}
            placeholder="Rp 0"
            onChange={(e) => setModal(formatRupiah(e.target.value))}
            className="w-full p-3 rounded-xl bg-gray-950 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>

        {/* HARGA JUAL */}
        <div>
          <label className="text-sm text-gray-400 flex items-center gap-1 mb-1">
            <Wallet size={14} />
            Harga Jual
          </label>

          <input
            type="text"
            value={jual}
            placeholder="Rp 0"
            onChange={(e) => setJual(formatRupiah(e.target.value))}
            className="w-full p-3 rounded-xl bg-gray-950 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>

        {/* PROFIT */}
        <ProfitCard profit={profit} />

        {/* BUTTON */}
        <SubmitButton loading={loading} />
      </form>
    </motion.div>
  );
}
