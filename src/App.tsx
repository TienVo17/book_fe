import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import Banner from "./layouts/homepage/HomePage";
import HomePage from "./layouts/homepage/HomePage";
import { getAllBook } from "./api/SachApi";
function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("");

  return (
    <div className="App">
      <Navbar
        tuKhoaTimKiem={tuKhoaTimKiem}
        setTuKhoaTimKiem={setTuKhoaTimKiem}
      />
      <HomePage tuKhoaTimKiem={tuKhoaTimKiem} />
      <Footer />
    </div>
  );
}

export default App;
