export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        
        {/* ბრენდი და საავტორო უფლებები */}
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            10X Shop
          </span>
          <p className="text-xs">
            © 2026 Front-end Diploma Project.
          </p>
        </div>

        {/* ნავიგაცია და რესურსები */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#catalog" className="transition hover:text-blue-600 dark:hover:text-blue-400">
            Catalog
          </a>
          <a href="#cart" className="transition hover:text-blue-600 dark:hover:text-blue-400">
            Cart
          </a>
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            DummyJSON API ↗
          </a>
        </div>

      </div>
    </footer>
  );
};