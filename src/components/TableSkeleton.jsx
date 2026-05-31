export default function TableSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <div className="animate-pulse space-y-4">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-800"></div>

          <div className="flex-1">
            <div className="h-4 bg-gray-800 rounded w-40 mb-2"></div>
            <div className="h-3 bg-gray-800 rounded w-24"></div>
          </div>
        </div>

        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-12 bg-gray-800 rounded-xl"
          />
        ))}

        <div className="flex justify-center pt-4">
          <div className="flex items-center gap-3">

            <div className="relative">
              <div className="w-8 h-8 rounded-full border-4 border-gray-700"></div>

              <div className="absolute inset-0 w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>

            <span className="text-gray-400 font-medium">
              Memuat Riwayat Transaksi...
            </span>

          </div>
        </div>

      </div>
    </div>
  );
}