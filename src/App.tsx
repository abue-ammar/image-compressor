import Footer from "./components/footer";
import Header from "./components/header";
import ImageCompressor from "./components/image-compressor";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <ImageCompressor />
          <Toaster />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
