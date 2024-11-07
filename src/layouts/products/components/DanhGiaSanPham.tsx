import React, { useEffect, useState } from "react";
import DanhGiaModel from "../../../models/DanhGiaModel";
import { getAllReviewOfOneBook } from "../../../api/DanhGiaAPI";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface DanhGiaSanPhamProps {
  maSach: number;
}

export const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="stars d-inline-block">
      {[...Array(fullStars)].map((_, index) => (
        <i key={`full-${index}`} className="fas fa-star text-warning"></i>
      ))}
      {halfStar && <i className="fas fa-star-half-alt text-warning"></i>}
      {[...Array(emptyStars)].map((_, index) => (
        <i key={`empty-${index}`} className="far fa-star text-warning"></i>
      ))}
    </div>
  );
};

const DanhGiaSanPham: React.FC<DanhGiaSanPhamProps> = ({ maSach }) => {
  const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState<string | null>(null);

  useEffect(() => {
    getAllReviewOfOneBook(maSach)
      .then((danhGia) => {
        setDanhSachDanhGia(danhGia);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setDangTaiDuLieu(false);
        setBaoLoi(error.message);
      });
  }, [maSach]);

  if (dangTaiDuLieu) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (baoLoi) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="fas fa-exclamation-circle me-2"></i>
        {baoLoi}
      </div>
    );
  }

  if (danhSachDanhGia.length === 0) {
    return (
      <div className="text-center my-4">
        <div className="alert alert-info" role="alert">
          <i className="fas fa-info-circle me-2"></i>
          Chưa có đánh giá nào cho sản phẩm này
        </div>
      </div>
    );
  }

  return (
    <div className="review-section my-4">
      <h3 className="mb-4">
        <i className="fas fa-comments me-2"></i>
        Đánh giá từ khách hàng
      </h3>
      <div className="review-list">
        {danhSachDanhGia.map((danhGia) => (
          <div key={danhGia.maDanhGia} className="review-item card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <i className="fas fa-user-circle me-2 text-primary"></i>
                  <span className="fw-bold">Khách hàng</span>
                </div>
                <small className="text-muted">
                  {format(new Date(), 'dd/MM/yyyy HH:mm', { locale: vi })}
                </small>
              </div>
              <div className="mb-2">
                {renderStars(danhGia.diemXepHang)}
                <span className="ms-2 text-muted">
                  ({danhGia.diemXepHang}/5)
                </span>
              </div>
              <p className="review-content mb-0">
                {danhGia.nhanXet}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DanhGiaSanPham;
