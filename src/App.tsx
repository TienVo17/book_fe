import React, { useState } from "react";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layouts/about/About";
import ChiTietSanPham from "./layouts/products/ChiTietSanPham";
import DangKyNguoiDung from "./layouts/user/DangKyNguoiDung";
import KichHoatTaiKhoan from "./layouts/user/KichHoatTaiKhoan";
import DangNhap from "./layouts/user/DangNhap";
import Test from "./layouts/user/Test";
import AdminLayout from "./layouts/admin/layouts/AdminLayout";
import DanhSachSach from "./layouts/admin/components/DanhSachSach";
import GioHang from "./layouts/products/GioHang";
import { ProtectedRoute } from "./layouts/utils/ProtectedRoute";
import HomePage from "./layouts/homepage/HomePage";
import CapNhatSach from "./layouts/admin/components/CapNhatSach";
import { ToastContainer } from 'react-toastify';



function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quan-ly/*" element={<AdminLayout />} />
        <Route path="/*" element={
          <>
            <Navbar
              tuKhoaTimKiem={tuKhoaTimKiem}
              setTuKhoaTimKiem={setTuKhoaTimKiem}
            />
            <Routes>
              <Route path="/" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
              <Route
                path="/:maTheLoai"
                element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/sach/:maSach" element={<ChiTietSanPham />} />
              <Route path="/dang-ky" element={<DangKyNguoiDung />} />
              <Route
                path="/kich-hoat/:email/:maKichHoat"
                element={<KichHoatTaiKhoan />}
              />
              <Route 
                path="/dang-nhap" 
                element={
                  <ProtectedRoute>
                    <DangNhap />
                  </ProtectedRoute>
                } 
              />
              <Route path="/test" element={<Test />} />
              <Route path="/quan-ly/danh-sach-sach" element={<DanhSachSach />} />
              <Route path="/gio-hang" element={<GioHang />} />
              <Route path="/quan-ly/cap-nhat-sach/:maSach" element={<CapNhatSach />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
