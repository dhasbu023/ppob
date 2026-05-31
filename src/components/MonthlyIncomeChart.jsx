import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function groupByMonth(data) {
  const map = {};

  data.forEach((item) => {
    const date = new Date(item.Tanggal);

    if (!date || isNaN(date)) return;

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const nominal =
      Number(
        String(item.Profit || 0).replace(
          /[^\d.-]/g,
          ""
        )
      ) || 0;

    map[key] =
      (map[key] || 0) + nominal;
  });

  return Object.keys(map)
    .sort()
    .map((key) => ({
      month: key,
      income: map[key],
    }));
}

export default function MonthlyIncomeChart({
  data = [],
}) {
  const chartData =
    groupByMonth(data);

  // =====================
  // SKELETON LOADING
  // =====================
  if (!data.length) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg">

        <div className="animate-pulse">

          <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-40 bg-gray-800 rounded"></div>

            <div className="w-10 h-10 rounded-full bg-gray-800"></div>
          </div>

          <div className="h-[180px] bg-gray-800 rounded-xl"></div>

        </div>

      </div>
    );
  }

  // =====================
  // EMPTY STATE
  // =====================
  if (!chartData.length) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">

        <div className="text-5xl mb-3 animate-bounce">
          📈
        </div>

        <h3 className="text-white font-semibold">
          Belum Ada Data
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          Grafik penghasilan akan muncul
          setelah transaksi tersedia.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mt-4 shadow-lg transition-all duration-500 hover:border-blue-500/40 hover:shadow-blue-500/10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">

        <div>
          <p className="text-xs text-gray-400">
            Analisis Penghasilan
          </p>

          <h2 className="text-sm font-semibold text-white">
            Grafik Penghasilan per Bulan
          </h2>
        </div>

        <div className="text-3xl animate-pulse">
          📈
        </div>

      </div>

      {/* CHART */}
      <div className="w-full animate-fade-in">

        <ResponsiveContainer
          width="100%"
          height={220}
        >
          <BarChart
            data={chartData}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#333"
            />

            <XAxis
              dataKey="month"
              stroke="#aaa"
              fontSize={10}
            />

            <YAxis
              stroke="#aaa"
              fontSize={10}
            />

            <Tooltip
              contentStyle={{
                background:
                  "#111827",
                border:
                  "1px solid #374151",
                borderRadius:
                  "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="income"
              fill="#3b82f6"
              radius={[
                8,
                8,
                0,
                0,
              ]}
              animationDuration={
                1200
              }
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* FOOTER */}
      <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-500">
        Akumulasi profit berdasarkan bulan transaksi
      </div>

    </div>
  );
}