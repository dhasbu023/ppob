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
      Number(
        String(item.Profit).replace(
          /[^\d.-]/g,
          ""
        )
      ) || 0;

    map[key] =
      (map[key] || 0) + profit;
  });

  return map;
}

function formatMonthLabel(key) {
  const [year, month] =
    key.split("-");

  const date = new Date(
    year,
    month - 1
  );

  return date.toLocaleString(
    "id-ID",
    {
      month: "long",
      year: "numeric",
    }
  );
}

export default function MonthlyProfitCard({
  data = [],
}) {
  const monthlyData = useMemo(
    () => groupProfitByMonth(data),
    [data]
  );

  const sortedMonths =
    Object.keys(monthlyData).sort();

  // =====================
  // SKELETON LOADING
  // =====================
  if (!data.length) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg">

        <div className="animate-pulse">

          <div className="flex justify-between items-center">
            <div>
              <div className="h-3 w-32 bg-gray-800 rounded mb-2"></div>
              <div className="h-6 w-20 bg-gray-800 rounded"></div>
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-800"></div>
          </div>

          <div className="mt-5">
            <div className="h-3 w-40 bg-gray-800 rounded mb-2"></div>
            <div className="h-8 w-48 bg-gray-800 rounded"></div>
          </div>

          <div className="mt-5 space-y-3">
            {[...Array(5)].map(
              (_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-800 rounded-lg"
                />
              )
            )}
          </div>

        </div>

      </div>
    );
  }

  // =====================
  // EMPTY STATE
  // =====================
  if (!sortedMonths.length) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">

        <div className="text-4xl mb-2 animate-bounce">
          📊
        </div>

        <p className="text-gray-400 text-sm">
          Tidak ada data profit
        </p>

      </div>
    );
  }

  const totalAllProfit =
    sortedMonths.reduce(
      (acc, key) =>
        acc + monthlyData[key],
      0
    );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg w-full transition-all duration-500 hover:border-blue-500/40 hover:shadow-blue-500/10">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs text-gray-400">
            Total Profit Semua Bulan
          </p>

          <h2 className="text-lg font-bold text-white">
            {sortedMonths.length} Bulan
          </h2>
        </div>

        <div className="text-3xl animate-pulse">
          📅
        </div>

      </div>

      {/* TOTAL */}
      <div className="mt-4">

        <p className="text-gray-400 text-xs">
          Total Keseluruhan Profit
        </p>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
          Rp{" "}
          {totalAllProfit.toLocaleString(
            "id-ID"
          )}
        </h1>

      </div>

      {/* LIST */}
      <div className="mt-4 space-y-2 max-h-64 overflow-auto pr-1">

        {sortedMonths.map(
          (key, index) => (
            <div
              key={key}
              className="flex justify-between text-xs bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 p-2 rounded-lg animate-fade-in"
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >
              <span className="text-gray-300">
                {formatMonthLabel(
                  key
                )}
              </span>

              <span className="text-green-400 font-medium">
                Rp{" "}
                {monthlyData[
                  key
                ].toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>
          )
        )}

      </div>

      {/* FOOTER */}
      <div className="mt-3 text-xs text-gray-500 border-t border-gray-800 pt-3">
        Data dari seluruh transaksi
      </div>

    </div>
  );
}