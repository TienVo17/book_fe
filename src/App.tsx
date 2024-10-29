import React, { useState } from "react";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import Banner from "./layouts/homepage/HomePage";
import HomePage from "./layouts/homepage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layouts/about/About";
import ChiTietSanPham from "./layouts/products/ChiTietSanPham";
import DangKyNguoiDung from "./layouts/user/DangKyNguoiDung";
import KichHoatTaiKhoan from "./layouts/user/KichHoatTaiKhoan";
import DangNhap from "./layouts/user/DangNhap";
import Test from "./layouts/user/Test";
function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          tuKhoaTimKiem={tuKhoaTimKiem}
          setTuKhoaTimKiem={setTuKhoaTimKiem}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}
          />
          <Route
            path="/:maTheLoai"
            element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/sach/:maSach" element={<ChiTietSanPham />} />

          <Route path="/dangKy" element={<DangKyNguoiDung />} />
          <Route
            path="/kich-hoat/:email/:maKichHoat"
            element={<KichHoatTaiKhoan />}
          />
          <Route
            path="/dangNhap"
            element={<DangNhap />}
          />
          <Route path='/test' element={<Test />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
