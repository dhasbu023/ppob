import { Search } from "lucide-react";

export default function TransactionFilters({
  filter,
  setFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  month,
  setMonth,
  search,
  setSearch,
}) {
  return (
    <div>

      {/* SEARCH */}
      <div className="mt-4 relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Cari nama produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {[
          "all",
          "daily",
          "monthly",
          "yearly",
          "range",
          "month",
        ].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-2 rounded-xl text-sm capitalize ${
              filter === f
                ? "bg-blue-600"
                : "bg-gray-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* RANGE FILTER */}
      {filter === "range" && (
        <div className="flex gap-2 mt-3">
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
            className="bg-gray-800 p-2 rounded"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
            className="bg-gray-800 p-2 rounded"
          />
        </div>
      )}

      {/* MONTH FILTER */}
      {filter === "month" && (
        <div className="mt-3">
          <input
            type="month"
            value={month}
            onChange={(e) =>
              setMonth(e.target.value)
            }
            className="bg-gray-800 p-2 rounded"
          />
        </div>
      )}
    </div>
  );
}