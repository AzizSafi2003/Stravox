const LoadingSpinner = () => (
  <div className="fixed inset-0 z-9999 bg-base-100 flex flex-col items-center justify-center gap-8">
    {/* Loading text with animation */}
    <div className="flex items-center gap-3">
      <p className="text-3xl font-semibold text-base-content animate-pulse">
        Loading
      </p>
      <div className="flex gap-1.5 items-center h-8">
        <span className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <span className="w-3 h-3 rounded-full bg-primary animate-bounce" />
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
