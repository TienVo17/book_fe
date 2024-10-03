import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import Banner from "./layouts/homepage/HomePage";
import HomePage from "./layouts/homepage/HomePage";
function App() {
  return (
    <div>
      <Navbar />
      <HomePage/>
      <Footer />
    </div>
  );
}

export default App;
