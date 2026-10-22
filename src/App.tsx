import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* 1. ზედა ზოლი */}
      <Navbar />

      {/* 2. ძირითადი სივრცე (გაიწელება flex-1-ით) */}
      <main className="container mx-auto flex-1 px-4 py-8">
        <h1 className="text-2xl font-bold">Welcome to 10x Shop</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Products will be displayed here soon.
        </p>
      </main>

      {/* 3. ქვედა ზოლი */}
      <Footer />
    </div>
  );
}