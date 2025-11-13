export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        {/* I'm creating a stylish loading spinner with the ANBU gold accent */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-anbu-gold border-t-transparent" />
        </div>
        <p className="animate-pulse font-mono text-sm uppercase tracking-wider text-anbu-gold">
          Loading...
        </p>
      </div>
    </div>
  );
}
