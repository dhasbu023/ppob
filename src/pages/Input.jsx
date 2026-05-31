import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addTransaction } from "../services/api";

import {
  ArrowLeft,
  PlusCircle,
  Wallet,
  Tag,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function Input() {
  const navigate = useNavigate();

  const [jenis, setJenis] = useState("");
  const [modal, setModal] = useState("");
  const [jual, setJual] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [modalType, setModalType] =
    useState("");

  const [modalMessage, setModalMessage] =
    useState("");

  // =========================
  // FORMAT RUPIAH
  // =========================
  const formatRupiah = (value) => {
    const number =
      value.replace(/\D/g, "");

    if (!number) return "";

    return (
      "Rp " +
      new Intl.NumberFormat(
        "id-ID"
      ).format(number)
    );
  };

  const parseRupiah = (value) => {
    return Number(
      String(value).replace(
        /\D/g,
        ""
      )
    );
  };

  // =========================
  // PROFIT
  // =========================
  const modalValue =
    parseRupiah(modal || "0");

  const jualValue =
    parseRupiah(jual || "0");

  const profit =
    jualValue - modalValue;

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !jenis ||
      !modal ||
      !jual
    ) {
      setModalType("error");
      setModalMessage(
        "Semua field wajib diisi!"
      );
      setShowModal(true);
      return;
    }

    if (modalValue <= 0) {
      setModalType("error");
      setModalMessage(
        "Harga modal harus lebih dari 0"
      );
      setShowModal(true);
      return;
    }

    if (jualValue <= 0) {
      setModalType("error");
      setModalMessage(
        "Harga jual harus lebih dari 0"
      );
      setShowModal(true);
      return;
    }

    if (jualValue < modalValue) {
      setModalType("error");
      setModalMessage(
        "Harga jual tidak boleh lebih kecil dari harga modal"
      );
      setShowModal(true);
      return;
    }

    const data = {
      source: "web",
      userId: "web",
      jenis,
      modal: modalValue,
      jual: jualValue,
    };

    try {
      setLoading(true);

      const res =
        await addTransaction(data);

      if (
        res?.status === "ok"
      ) {
        setModalType(
          "success"
        );

        setModalMessage(
          "Transaksi berhasil disimpan!"
        );

        setJenis("");
        setModal("");
        setJual("");
      } else {
        throw new Error(
          res?.message ||
            "Gagal menyimpan"
        );
      }
    } catch (err) {
      console.error(err);

      setModalType("error");

      setModalMessage(
        "Gagal menyimpan data!"
      );
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4">

      <div className="max-w-md mx-auto">

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
          className="flex items-center gap-3 mb-6"
        >
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              navigate("/")
            }
            className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700"
          >
            <ArrowLeft
              size={18}
            />
          </motion.button>

          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Input
              Transaksi
            </h1>

            <p className="text-xs text-gray-400">
              Tambahkan
              transaksi baru
            </p>
          </div>
        </motion.div>

        {/* FORM CARD */}
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
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >

            {/* JENIS */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                <Tag
                  size={14}
                />
                Nama Produk
              </label>

              <input
                type="text"
                placeholder="Contoh: Pulsa 100K"
                value={jenis}
                onChange={(e) =>
                  setJenis(
                    e.target
                      .value
                  )
                }
                className="w-full p-3 rounded-xl bg-gray-950 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>

            {/* MODAL */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                <Wallet
                  size={14}
                />
                Harga Modal
              </label>

              <input
                type="text"
                placeholder="Rp 0"
                value={modal}
                onChange={(e) =>
                  setModal(
                    formatRupiah(
                      e.target
                        .value
                    )
                  )
                }
                className="w-full p-3 rounded-xl bg-gray-950 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>

            {/* JUAL */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                <Wallet
                  size={14}
                />
                Harga Jual
              </label>

              <input
                type="text"
                placeholder="Rp 0"
                value={jual}
                onChange={(e) =>
                  setJual(
                    formatRupiah(
                      e.target
                        .value
                    )
                  )
                }
                className="w-full p-3 rounded-xl bg-gray-950 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>

            {/* PROFIT */}
            <motion.div
              animate={{
                scale:
                  profit > 0
                    ? 1.02
                    : 1,
              }}
              className="bg-gray-950 border border-gray-800 p-4 rounded-xl text-center"
            >
              <p className="text-sm text-gray-400">
                Estimasi
                Profit
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
                ).format(
                  profit
                )}
              </p>
            </motion.div>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale:
                  loading
                    ? 1
                    : 1.02,
              }}
              whileTap={{
                scale:
                  loading
                    ? 1
                    : 0.98,
              }}
              type="submit"
              disabled={
                loading
              }
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed p-3 rounded-xl flex justify-center items-center gap-2 font-semibold shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2
                    size={
                      18
                    }
                    className="animate-spin"
                  />
                  Menyimpan...
                </>
              ) : (
                <>
                  <PlusCircle
                    size={
                      18
                    }
                  />
                  Simpan
                  Transaksi
                </>
              )}
            </motion.button>

          </form>
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              className="bg-gray-900 border border-gray-700 p-6 rounded-2xl w-80 text-center shadow-2xl"
            >
              <div className="flex justify-center mb-3">

                {modalType ===
                "success" ? (
                  <CheckCircle2
                    size={
                      60
                    }
                    className="text-green-400"
                  />
                ) : (
                  <XCircle
                    size={
                      60
                    }
                    className="text-red-400"
                  />
                )}

              </div>

              <h2
                className={`text-xl font-bold mb-2 ${
                  modalType ===
                  "success"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {modalType ===
                "success"
                  ? "Berhasil"
                  : "Gagal"}
              </h2>

              <p className="text-gray-300 mb-5">
                {
                  modalMessage
                }
              </p>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
                className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl py-3 font-medium"
              >
                Tutup
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}