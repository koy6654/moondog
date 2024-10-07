export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#4A4F5A] bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-8 border-[#87CEFA] border-t-transparent" />
      <div className="font-concert-one text-center text-xl">Loading...</div>
    </div>
  );
}
