import React, { useEffect, useState } from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { getAllImageOfOneBook } from "../../../api/HinhAnhApi";

interface DanhGiaSanPham {
  maSach: number;
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {
  const maSach: number = props.maSach;

  const [danhSachDanhGia, setdanhSachDanhGia] = useState<HinhAnhModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);

  useEffect(() => {
    getAllImageOfOneBook(maSach)
      .then((danhSach) => {
        setdanhSachDanhGia(danhSach);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setDangTaiDuLieu(false);
        setBaoLoi(error.message);
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

  return (
    <div className="row">
      <div>
        {hinhAnhDangChon && (
          <img
            src={hinhAnhDangChon.dataImage}
            style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
            alt="Main"
          />
        )}
      </div>
      <div className="row mt-2">
        {danhSachDanhGia.map((hinhAnh, index) => (
          <div className="col-3" key={index}>
            <img
              onClick={() => chonAnh(hinhAnh)}
              src={hinhAnh.dataImage}
              alt={`Thumbnail ${index}`}
              style={{
                width: "80px", // Set thumbnail width
                height: "80px", // Set thumbnail height
                objectFit: "cover", // Prevent stretching and keep aspect ratio
                cursor: "pointer",
                border: hinhAnhDangChon === hinhAnh ? "2px solid #007bff" : "none",
                borderRadius: "4px"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DanhGiaSanPham;
