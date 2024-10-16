import React, { useEffect, useState } from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { getAllImageOfOneBook } from "../../../api/HinhAnhApi";

interface HinhAnhSanPham {
  maSach: number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {
  const maSach: number = props.maSach;

  const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);
  const [hinhAnhDangChon, setHinhAnhDangChon] = useState<HinhAnhModel | null>(
    null
  );

  const chonAnh = (hinhAnh: HinhAnhModel) => {
    setHinhAnhDangChon(hinhAnh);
  };

  useEffect(() => {
    getAllImageOfOneBook(maSach)
      .then((danhSach) => {
        setDanhSachAnh(danhSach);
        if (danhSach.length > 0) {
          setHinhAnhDangChon(danhSach[0]);
        }
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
        {danhSachAnh.map((hinhAnh, index) => (
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

export default HinhAnhSanPham;
