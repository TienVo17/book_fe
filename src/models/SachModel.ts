import HinhAnhModel from "./HinhAnhModel";

class SachModel {
  maSach: number;
  tenSach?: string; // có thể bị null
  giaBan?: number;
  giaNiemYet?: number;
  moTa?: string;
  soLuong?: number;
  tenTacGia?: string;
  trungBinhXepHang?: number;
  isbn?: string;
  danhSachAnh?: HinhAnhModel[];

  constructor(
    maSach: number,
    tenSach?: string, // có thể bị null
    giaBan?: number,
    giaNiemYet?: number,
    moTa?: string,
    soLuong?: number,
    tenTacGia?: string,
    trungBinhXepHang?: number,
    isbn?: string,
    danhSachAnh?: HinhAnhModel[]
  ) {
    this.maSach = maSach;
    this.tenSach = tenSach;
    this.giaBan = giaBan;
    this.giaNiemYet = giaNiemYet;
    this.moTa = moTa;
    this.soLuong = soLuong;
    this.tenTacGia = tenTacGia;
    this.trungBinhXepHang = trungBinhXepHang;
    this.isbn = isbn;
    this.danhSachAnh = danhSachAnh;
  }
}
export default SachModel;

// danhSachMaTheLoai?: number[];
// danhSachTheLoai?: GenreModel[];
// daThichSach?: boolean;
// phanTramGiamGia?: number;
// soLuongDaBan?: number;
// anhDaiDien?: string;
