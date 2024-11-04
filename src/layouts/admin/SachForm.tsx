import React, { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAdmin";
const SachForm: React.FC = () => {
  const [sach, setSach] = useState({
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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/sach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sach),
    }).then((reponse) => {
      if (reponse.ok) {
        alert("Đã thêm sách thành công!");
        setSach({
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
      } else {
        alert("Gặp lỗi trong quá trình thêm sách!");
      }
    });
  };

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col-md-6 col-sm-8 mx-auto my-4">
          <div className="card p-4">
            <h1 className="text-center mb-4">THÊM SÁCH</h1>
            <form onSubmit={handleSubmit}>
              <input type="hidden" id="maSach" value={sach.maSach} />

              <div className="mb-3">
                <label htmlFor="tenSach" className="form-label">
                  Tên sách
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={sach.tenSach}
                  onChange={(e) =>
                    setSach({ ...sach, tenSach: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="giaBan" className="form-label">
                  Giá bán
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={sach.giaBan}
                  onChange={(e) =>
                    setSach({ ...sach, giaBan: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="giaNiemYet" className="form-label">
                  Giá niêm yết
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={sach.giaNiemYet}
                  onChange={(e) =>
                    setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="soLuong" className="form-label">
                  Số lượng
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={sach.soLuong}
                  onChange={(e) =>
                    setSach({ ...sach, soLuong: parseInt(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="tenTacGia" className="form-label">
                  Tên tác giả
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={sach.tenTacGia}
                  onChange={(e) =>
                    setSach({ ...sach, tenTacGia: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="moTa" className="form-label">
                  Mô tả
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={sach.moTa}
                  onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="isbn" className="form-label">
                  ISBN
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={sach.isbn}
                  onChange={(e) => setSach({ ...sach, isbn: e.target.value })}
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const SachForm_Admin = RequireAdmin(SachForm);
export default SachForm_Admin;
