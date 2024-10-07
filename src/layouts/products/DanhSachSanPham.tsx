import React, { useEffect, useState } from "react";
import Book from "../../models/Book";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { getAllBook } from "../../api/SachApi";

const DanhSachSanPham: React.FC = () => {
  const [danhsachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
  const [baoLoi, setBaoLoi] = useState(null);

  useEffect(
    () => {
      getAllBook()
        .then((sachData) => {
          setDanhSachQuyenSach(sachData);
          setDangTaiDuLieu(false);
        })
        .catch(
          error => {
            setBaoLoi(error.message);
          }
        );
    },
    [] // Chỉ gọi 1 lần
  );

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
        <h1>Gặp lỗi : {baoLoi}</h1>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row mt-4">
        {danhsachQuyenSach.map((sach) => (
          <SachProps key={sach.maSach} sach={sach} />
        ))}
      </div>
    </div>
  );
};
export default DanhSachSanPham;
