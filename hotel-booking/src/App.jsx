import { Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import Rooms from "./pages/Rooms";
import Menu from "./pages/Menu";
import Services from "./pages/Services";
import Entertainment from "./pages/Entertainment";
import Contact from "./pages/Contact";
import NotFound from "./components/NotFound";
import React from "react";
function App() {
  return (
<>
      <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/services" element={<Services />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      <Footer />
</>
  );
}

export default App;
