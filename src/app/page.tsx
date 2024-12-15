import Hero from "./components/hero";
import { Navbar } from "./components/navbar";
import { ThemeProvider as NextThemesProvider } from "next-themes"
export default function Home() {
  return (
    <NextThemesProvider>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
    </main>
    </NextThemesProvider>
  );
}