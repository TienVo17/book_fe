import React, { useEffect, useState } from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { getAllReviewOfOneBook } from "../../../api/DanhGiaAPI";
import DanhGiaModel from "../../../models/DanhGiaModel";

interface DanhGiaSanPham {
  maSach: number;
}
export const renderStars = (rating: number) => {
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

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {
  const maSach: number = props.maSach;

  const [danhSachDanhGia, setdanhSachDanhGia] = useState<DanhGiaModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);

  useEffect(
    () => {
      getAllReviewOfOneBook(maSach)
        .then((danhSachDanhGia) => {
          setdanhSachDanhGia(danhSachDanhGia);
          setDangTaiDuLieu(false);
        })
        .catch((error) => {
          setDangTaiDuLieu(false);
          setBaoLoi(error.message);
        });
    },
    [] // Chi goi mot lan
  );

  console.log(danhSachDanhGia.length);

  // console.log(danhSachDanhGia.length);

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

  return (
    <div className="container mt-2 mb-2 text-center">
      <h4>Đánh giá sản phẩm: </h4>
      {danhSachDanhGia.map((danhGia, index) => (
        <div className="row">
          <div className="col-4  text-end">
            <p>{renderStars(danhGia.diemXepHang ?? 0)}</p>
          </div>
          <div className="col-8 text-start">
            <p>{danhGia.nhanXet}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DanhGiaSanPham;
