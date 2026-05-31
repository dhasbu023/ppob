export default function Table({ data = [], onDelete }) {

  // =========================
  // FORMAT RUPIAH AMAN
  // =========================
  const formatRupiah = (num) => {
    const clean = Number(String(num).replace(/[^\d.-]/g, ""));

    if (isNaN(clean)) return "0";

    return new Intl.NumberFormat("id-ID").format(clean);
  };

  // =========================
  // FORMAT TANGGAL AMAN
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

            // =========================
            // FILTER DATA RUSAK (#NUM!)
            // =========================
            const jual = Number(String(item?.Jual).replace(/[^\d.-]/g, ""));
            const profit = Number(String(item?.Profit).replace(/[^\d.-]/g, ""));

            return (
              <tr
                key={item?.ID}
                className="border-t border-gray-800 hover:bg-gray-900 transition"
              >

                {/* TANGGAL */}
                <td className="p-3">
                  {formatTanggal(item?.Tanggal)}
                </td>

                {/* PRODUK */}
                <td className="p-3">
                  {item?.Jenis || "-"}
                </td>

                {/* JUAL */}
                <td className="p-3">
                  Rp {formatRupiah(jual)}
                </td>

                {/* PROFIT */}
                <td className="p-3 text-green-400">
                  Rp {formatRupiah(profit)}
                </td>

                {/* DELETE */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => onDelete?.(item?.ID)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs transition"
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