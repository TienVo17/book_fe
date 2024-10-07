import React from "react";
import HinhAnhModel from "../models/HinhAnhModel";
import { my_request } from "./Request";

export async function getAllImageOfOneBook(
  maSach: number
): Promise<HinhAnhModel[]> {
  const ketQua: HinhAnhModel[] = [];
  // Xác định endpoint
  const duongDan: string = `http://localhost:8080/sach/${maSach}/listHinhAnh`;
  //Gọi phương thức request
  const response = await my_request(duongDan);

  // Lấy ra json sách
  const responseData = response._embedded.hinhAnhs;
  for (const key in responseData) {
    ketQua.push({
      maHinhAnh: responseData[key].maHinhAnh,
      tenHinhAnh: responseData[key].tenHinhAnh,
      icon: responseData[key].icon,
      urlHinh: responseData[key].urlHinh,
      dataImage: responseData[key].dataImage,
    });
  }

  return ketQua;
}
