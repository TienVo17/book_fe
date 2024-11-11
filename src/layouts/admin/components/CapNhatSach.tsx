import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capNhatSach, getBookById } from '../../../api/SachApi';
import SachModel from '../../../models/SachModel';

const CapNhatSach: React.FC = () => {
  const { maSach } = useParams<{ maSach: string }>();
  const navigate = useNavigate();
  const [sach, setSach] = useState<SachModel>({
    maSach: 0,
    tenSach: "",
    giaBan: 0,
    giaNiemYet: 0,
    moTa: "",
    soLuong: 0,
    tenTacGia: "",
    isbn: "",
    trungBinhXepHang: 0,
  });

  useEffect(() => {
    if (maSach) {
      getBookById(parseInt(maSach))
        .then((sachData) => {
          if (sachData) {
            setSach(sachData);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Không thể lấy thông tin sách!');
        });
    }
  }, [maSach]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const ketQua = await capNhatSach(sach);
    if (ketQua) {
      alert('Cập nhật sách thành công!');
      navigate('/quan-ly/danh-sach-sach');
    } else {
      alert('Có lỗi xảy ra khi cập nhật sách!');
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Cập nhật sách</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item"><a href="/quan-ly">Dashboard</a></li>
        <li className="breadcrumb-item active">Cập nhật sách</li>
      </ol>
      
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-edit me-1"></i>
          Cập nhật thông tin sách
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Form fields giống như SachForm.tsx */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="tenSach" className="form-label">Tên sách</label>
                  <input
                    className="form-control"
                    type="text"
                    value={sach.tenSach}
                    onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
                    required
                  />
                </div>
                {/* Thêm các trường khác tương tự */}
              </div>
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary me-2">
                <i className="fas fa-save me-2"></i>
                Cập nhật
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/quan-ly/danh-sach-sach')}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Quay lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CapNhatSach;