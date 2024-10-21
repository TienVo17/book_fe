import React from "react";
import DanhGiaModel from "../models/DanhGiaModel";
import { my_request } from "./Request";

async function getAllReviewOfBook(duongDan: string): Promise<DanhGiaModel[]> {
  const ketQua: DanhGiaModel[] = [];

  // Gọi phương thức request
  const response = await my_request(duongDan);

  // Lấy ra json sach
  const responseData = response._embedded.suDanhGias;

  for (const key in responseData) {
    ketQua.push({
      maDanhGia: responseData[key].maDanhGia,
      nhanXet: responseData[key].nhanXet,
      diemXepHang: responseData[key].diemXepHang,
    });
  }

  return ketQua;
}

export async function getAllReviewOfOneBook(
  maSach: number
): Promise<DanhGiaModel[]> {
  // Xác định endpoint
  const duongDan: string = `http://localhost:8080/sach/${maSach}/listDanhGia`;

  return getAllReviewOfBook(duongDan); // Call the correct function with the string
}

export async function getOneReviewOfOneBook(
  maSach: number
): Promise<DanhGiaModel[]> {
  // Xác định endpoint
  const duongDan: string = `http://localhost:8080/sach/${maSach}/listDanhGia?sort=maDanhGia,asc&page=0&size=1`;

  return getAllReviewOfBook(duongDan); // Call the correct function with the string
}
