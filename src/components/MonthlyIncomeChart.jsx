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

    const nominal = Number(item.Profit || 0);

    map[key] = (map[key] || 0) + nominal;
  });

  return Object.keys(map)
    .sort()
    .map((key) => ({
      month: key,
      income: map[key],
    }));
}

export default function MonthlyIncomeChart({ data = [] }) {
  const chartData = groupByMonth(data);

  if (!chartData.length) {
    return (
      <div className="bg-gray-900 border border-gray-800 p-3 rounded-2xl mt-4 text-gray-400 text-sm">
        Tidak ada data chart
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 p-3 rounded-2xl mt-4">
      <h2 className="text-xs text-gray-300 mb-2">
        Grafik Penghasilan per Bulan
      </h2>

      {/* FIX UTAMA DI SINI */}
      <div className="w-full">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#fff" fontSize={10} />
            <YAxis stroke="#fff" fontSize={10} />
            <Tooltip />
            <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}