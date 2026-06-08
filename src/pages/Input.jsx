import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addTransaction } from "../services/api";

import InputHeader from "../components/input/InputHeader";
import TransactionForm from "../components/input/TransactionForm";
import StatusModal from "../components/input/StatusModal";

import {
  formatRupiah,
  parseRupiah,
} from "../utils/currency";

export default function Input() {
  const navigate = useNavigate();

  const [tanggal, setTanggal] =
    useState(new Date());

  const [jenis, setJenis] =
    useState("");

  const [modal, setModal] =
    useState("");

  const [jual, setJual] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [modalType, setModalType] =
    useState("");

  const [modalMessage, setModalMessage] =
    useState("");

  const modalValue =
    parseRupiah(modal);

  const jualValue =
    parseRupiah(jual);

  const profit =
    jualValue - modalValue;

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    // VALIDASI
    if (!tanggal) {
      setModalType("error");
      setModalMessage(
        "Tanggal wajib diisi!"
      );
      setShowModal(true);
      return;
    }

    if (!jenis.trim()) {
      setModalType("error");
      setModalMessage(
        "Nama produk wajib diisi!"
      );
      setShowModal(true);
      return;
    }

    if (!modal || !jual) {
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

    if (
      jualValue < modalValue
    ) {
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

      // format YYYY-MM-DD
      tanggal:
        tanggal
          .toISOString()
          .split("T")[0],

      jenis: jenis.trim(),

      modal: modalValue,
      jual: jualValue,
    };

    try {
      setLoading(true);

      const res =
        await addTransaction(
          data
        );

      if (
        res?.status === "ok"
      ) {
        setModalType(
          "success"
        );

        setModalMessage(
          "Transaksi berhasil disimpan!"
        );

        // RESET FORM
        setTanggal(
          new Date()
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
        err.message ||
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

        <InputHeader
          onBack={() =>
            navigate("/")
          }
        />

        <TransactionForm
          tanggal={tanggal}
          setTanggal={
            setTanggal
          }
          jenis={jenis}
          setJenis={setJenis}
          modal={modal}
          setModal={setModal}
          jual={jual}
          setJual={setJual}
          profit={profit}
          loading={loading}
          onSubmit={
            handleSubmit
          }
          formatRupiah={
            formatRupiah
          }
        />

        <StatusModal
          open={showModal}
          type={modalType}
          message={
            modalMessage
          }
          onClose={() =>
            setShowModal(
              false
            )
          }
        />

      </div>
    </div>
  );
}