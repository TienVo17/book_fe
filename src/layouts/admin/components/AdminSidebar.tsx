import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleSubMenu = (menu: string) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const handleThemSach = () => {
    navigate('/quan-ly/them-sach');
  };

  return (
    <div className="sidebar" 
         style={{
           width: '250px', 
           height: '100vh', 
           position: 'fixed',
           left: 0,
           top: 0,
           backgroundColor: '#343a40',
           color: 'white',
           overflowY: 'auto'
         }}>
      <div className="p-3">
        <h4 className="text-center mb-4">
          <i className="fas fa-user-shield me-2"></i>
          Admin Panel
        </h4>
        <hr />
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/quan-ly/dashboard" className="nav-link text-white">
              <i className="fas fa-tachometer-alt me-2"></i>
              Dashboard
            </NavLink>
          </li>

          {/* Quản lý sách */}
          <li className="nav-item">
            <div className="nav-link text-white" style={{cursor: 'pointer'}} onClick={() => toggleSubMenu('sach')}>
              <i className="fas fa-book me-2"></i>
              Quản lý sách
              <i className={`fas fa-chevron-${openSubMenu === 'sach' ? 'down' : 'right'} float-end mt-1`}></i>
            </div>
            {openSubMenu === 'sach' && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <button 
                    onClick={handleThemSach}
                    className="nav-link text-white border-0 bg-transparent" 
                    style={{width: '100%', textAlign: 'left'}}
                  >
                    <i className="fas fa-plus me-2"></i>
                    Thêm sách
                  </button>
                </li>
                <li className="nav-item">
                  <NavLink to="danh-sach-sach" className="nav-link text-white">
                    <i className="fas fa-list me-2"></i>
                    Danh sách sách
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/quan-ly/cap-nhat-sach" className="nav-link text-white">
                    <i className="fas fa-edit me-2"></i>
                    Cập nhật sách
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Quản lý đơn hàng */}
          <li className="nav-item">
            <div className="nav-link text-white" style={{cursor: 'pointer'}} onClick={() => toggleSubMenu('donhang')}>
              <i className="fas fa-shopping-cart me-2"></i>
              Quản lý đơn hàng
              <i className={`fas fa-chevron-${openSubMenu === 'donhang' ? 'down' : 'right'} float-end mt-1`}></i>
            </div>
            {openSubMenu === 'donhang' && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <NavLink to="/quan-ly/don-hang-moi" className="nav-link text-white">
                    <i className="fas fa-plus me-2"></i>
                    Đơn hàng mới
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/quan-ly/danh-sach-don-hang" className="nav-link text-white">
                    <i className="fas fa-list me-2"></i>
                    Danh sách đơn hàng
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Các menu khác tương tự */}
          
          <li className="nav-item">
            <div className="nav-link text-white" style={{cursor: 'pointer'}} onClick={() => toggleSubMenu('nguoidung')}>
              <i className="fas fa-users me-2"></i>
              Quản lý người dùng
              <i className={`fas fa-chevron-${openSubMenu === 'nguoidung' ? 'down' : 'right'} float-end mt-1`}></i>
            </div>
            {openSubMenu === 'nguoidung' && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <NavLink to="/quan-ly/them-nguoi-dung" className="nav-link text-white">
                    <i className="fas fa-user-plus me-2"></i>
                    Thêm người dùng
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/quan-ly/danh-sach-nguoi-dung" className="nav-link text-white">
                    <i className="fas fa-list me-2"></i>
                    Danh sách người dùng
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className="mt-auto p-3">
        <hr />
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-light">
            <i className="fas fa-sign-out-alt me-2"></i>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;