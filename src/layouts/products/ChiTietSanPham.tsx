import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SachModel from "../../models/SachModel";
import { getBookById } from "../../api/SachApi";
import HinhAnhSanPham from "./components/HinhAnhSanPham";

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <i
            className="fas fa-star"
            key={`full-${index}`}
            style={{ color: "gold" }}
          ></i>
        ))}
      {halfStar && (
        <i className="fas fa-star-half-alt" style={{ color: "gold" }}></i>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <i
            className="far fa-star"
            key={`empty-${index}`}
            style={{ color: "gold" }}
          ></i>
        ))}
    </>
  );
};

const ChiTietSanPham: React.FC = () => {
  const { maSach } = useParams();
  let maSachNumber = 0;

  try {
    maSachNumber = parseInt(maSach + "");
    if (Number.isNaN(maSachNumber)) maSachNumber = 0;
  } catch (error) {
    maSachNumber = 0;
    console.error("Error", error);
  }

  const [sach, setSach] = useState<SachModel | null>(null);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);

  useEffect(() => {
    getBookById(maSachNumber)
      .then((sach) => {
        setSach(sach);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setBaoLoi(error.message);
        setDangTaiDuLieu(false);
      });
  }, [maSach]);

  if (dangTaiDuLieu) {
    return (
      <div>
        <h1>Đang tải dữ liệu</h1>
      </div>
    );
  }

  if (baoLoi) {
    return (
      <div>
        <h1>Gặp lỗi: {baoLoi}</h1>
      </div>
    );
  }

  if (!sach) {
    return (
      <div>
        <h1>Sách không tồn tại!</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <div className="col-4">
          <HinhAnhSanPham maSach={maSachNumber} />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-8">
              <h1>{sach.tenSach}</h1>
              <h4>{renderStars(sach.trungBinhXepHang ?? 0)}</h4>
              <h4>{sach.giaBan}</h4>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: sach.moTa + "" }} />
              <hr />
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiTietSanPham;
