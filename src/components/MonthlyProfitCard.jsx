import { useMemo } from "react";

function groupProfitByMonth(data) {
  const map = {};

  data.forEach((item) => {
    const date = new Date(item.Tanggal);
    if (!date || isNaN(date)) return;

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const profit =
      Number(String(item.Profit).replace(/[^\d.-]/g, "")) || 0;

    map[key] = (map[key] || 0) + profit;
  });

  return map;
}

function formatMonthLabel(key) {
  const [year, month] = key.split("-");
  const date = new Date(year, month - 1);

  return date.toLocaleString("id-ID", {
    month: "long",
    year: "numeric",
  });
}

export default function MonthlyProfitCard({ data = [] }) {
  const monthlyData = useMemo(() => groupProfitByMonth(data), [data]);

  // urutkan bulan dari lama ke baru
  const sortedMonths = Object.keys(monthlyData).sort();

  if (!sortedMonths.length) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-gray-400 text-sm">
        Tidak ada data profit
      </div>
    );
  }

  // total semua profit
  const totalAllProfit = sortedMonths.reduce(
    (acc, key) => acc + monthlyData[key],
    0
  );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg w-full">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Total Profit Semua Bulan</p>
          <h2 className="text-lg font-bold text-white">
            {sortedMonths.length} Bulan
          </h2>
        </div>

        <div className="text-blue-400 text-2xl">📅</div>
      </div>

      {/* TOTAL ALL PROFIT */}
      <div className="mt-4">
        <p className="text-gray-400 text-xs">Total Keseluruhan Profit</p>
        <h1 className="text-2xl font-bold text-green-400">
          Rp {totalAllProfit.toLocaleString("id-ID")}
        </h1>
      </div>

      {/* LIST PER BULAN */}
      <div className="mt-4 space-y-2 max-h-64 overflow-auto pr-1">

        {sortedMonths.map((key) => (
          <div
            key={key}
            className="flex justify-between text-xs bg-gray-800/50 p-2 rounded-lg"
          >
            <span className="text-gray-300">
              {formatMonthLabel(key)}
            </span>

            <span className="text-green-400 font-medium">
              Rp {monthlyData[key].toLocaleString("id-ID")}
            </span>
          </div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="mt-3 text-xs text-gray-500">
        Data dari seluruh transaksi
      </div>
    </div>
  );
}