import React from "react";
import Header from "./components/Header";
import Converter from "./components/Converter";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <Converter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
