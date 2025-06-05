export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-[#3ABEFF]/20"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-[#3ABEFF] animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-400">Loading Audit Dashboard...</p>
      </div>
    </div>
  )
}
