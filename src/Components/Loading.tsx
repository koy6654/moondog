export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-48 w-48 border-8 border-blue-500 border-t-transparent"></div>
    </div>
  );
}
