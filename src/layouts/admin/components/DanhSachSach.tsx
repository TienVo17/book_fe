import React, { useState, useEffect } from 'react';
import SachModel from '../../../models/SachModel';
import { getAllBook } from '../../../api/SachApi';
import { Link } from 'react-router-dom';
import { PhanTrang } from '../../utils/PhanTrang';

export default function DanhSachSach() {
  const [danhSachSach, setDanhSachSach] = useState<SachModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);

  useEffect(() => {
    getAllBook(trangHienTai - 1)
      .then((kq) => {
        setDanhSachSach(kq.ketQua);
        setTongSoTrang(kq.tongSoTrang);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setBaoLoi(error.message);
        setDangTaiDuLieu(false);
      });
  }, [trangHienTai]);

  const phanTrang = (trang: number) => setTrangHienTai(trang);

  if (dangTaiDuLieu) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (baoLoi) {
    return <div>Có lỗi xảy ra: {baoLoi}</div>;
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý sách</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item"><Link to="/quan-ly">Dashboard</Link></li>
        <li className="breadcrumb-item active">Danh sách sách</li>
      </ol>
      
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          Danh sách sách
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Mã sách</th>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Giá bán</th>
                <th>Số lượng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {danhSachSach.map((sach) => (
                <tr key={sach.maSach}>
                  <td>{sach.maSach}</td>
                  <td>{sach.tenSach}</td>
                  <td>{sach.tenTacGia}</td>
                  <td>{(sach.giaBan ?? 0).toLocaleString('vi-VN')} đ</td>
                  <td>{sach.soLuong}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-danger btn-sm">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PhanTrang 
        trangHienTai={trangHienTai}
        tongSoTrang={tongSoTrang}
        phanTrang={phanTrang}
      />
    </div>
  );
}

export {}; 