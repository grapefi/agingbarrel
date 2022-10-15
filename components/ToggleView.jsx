export default function ToggleView() {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button className="app-btn inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
      sVintage Solera
      </button>

      <button disabled className="app-btn inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
        Leaderboard (Coming Soon)
      </button>
    </div>
  );
}
