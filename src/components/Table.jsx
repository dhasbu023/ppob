export default function Table({ data = [] }) {

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID").format(Number(num || 0));
  };

  const formatTanggal = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

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

        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-3 text-left">Tanggal</th>
            <th className="p-3 text-left">Produk</th>
            <th className="p-3 text-left">Jual</th>
            <th className="p-3 text-left">Profit</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t border-gray-800">

              <td className="p-3">
                {formatTanggal(item?.Tanggal)}
              </td>

              <td className="p-3">
                {item?.Jenis || "-"}
              </td>

              <td className="p-3">
                Rp {formatRupiah(item?.Jual)}
              </td>

              <td className="p-3 text-green-400">
                Rp {formatRupiah(item?.Profit)}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}