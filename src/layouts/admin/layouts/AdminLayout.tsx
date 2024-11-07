import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import SachForm_Admin from '../SachForm';
import DanhSachSach from '../components/DanhSachSach';

const AdminLayout: React.FC = () => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <main className="flex-grow-1 p-4" style={{marginLeft: '250px'}}>
        <Routes>
          <Route path="them-sach" element={<SachForm_Admin />} />
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="/danh-sach-sach" element={<DanhSachSach />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;