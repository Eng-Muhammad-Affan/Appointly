export const NotFound = () => {
  return (
    <div
      className="hidden flex-col items-center justify-center py-8 space-y-6 text-center"
      id="empty-state"
    >
      {/* <div className="w-64 h-64 opacity-80">
            <img alt="No results found" className="w-full h-full object-contain" src="" />
          </div> */}
      <div className="max-w-md space-y-2">
        <h2 className="font-bold text-3xl text-primary">No services found</h2>
        <p className="text-base text-on-surface-variant">
          We couldn't find anything matching your current filters. Try adjusting
          your search or location settings.
        </p>
      </div>
      <button
        type="button"
        className="px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
        // onClick={() => window.resetFilters && window.resetFilters()}
      >
        Clear All Filters
      </button>
    </div>
  );
};
