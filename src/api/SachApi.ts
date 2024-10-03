import React from "react";
import SachModel from "../models/SachModel";

async function request(duongDan: string) {
  // Truy vấn tới đường dẫn
  const response = await fetch(duongDan);
  // Nếu bị trả về lỗi
  if (!response.ok) {
    throw new Error(`Không thể truy cập ${duongDan}`);
  }
  // Nếu tra về OK
  return response.json();
}
export async function getAllBook(): Promise<SachModel[]> {
  const ketQua: SachModel[] = [];
  // Xác định endpoint
  const duongDan: string = "http://localhost:8080/sach";
  //Gọi phương thức request
  const response = await request(duongDan);

  // Lấy ra json sách
  const responseData = response._embedded.saches;
  for (const key in responseData) {
    ketQua.push({
      maSach: responseData[key].maSach,
      tenSach: responseData[key].tenSach,
      giaBan: responseData[key].giaBan,
      giaNiemYet: responseData[key].giaNiemYet,
      moTa: responseData[key].moTa,
      soLuong: responseData[key].soLuong,
      tenTacGia: responseData[key].tenTacGia,
      trungBinhXepHang: responseData[key].trungBinhXepHang,
    });
  }

  console.log(response);
  return ketQua;
}
