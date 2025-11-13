export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        {/* I'm creating a stylish loading spinner with the ANBU gold accent */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
          <div className="absolute inset-0 border-4 border-anbu-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-anbu-gold text-sm font-mono uppercase tracking-wider animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}
