import Footer from "./components/footer";
import Header from "./components/header";
import ImageCompressor from "./components/image-compressor";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ImageCompressor />
      </main>
      <Footer />
    </div>
  );
}

export default App;
