import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SachModel from '../models/SachModel';


interface GioHangItem {
  maSach: number;
  sachDto: SachModel;
  soLuong: number;
  soLuongTon: number;
  giaBan: number;
}

export const useGioHang = () => {
  const [gioHang, setGioHang] = useState<GioHangItem[]>([]);

  useEffect(() => {
    const gioHangLocal = localStorage.getItem('gioHang');
    if (gioHangLocal) {
      setGioHang(JSON.parse(gioHangLocal));
    }
  }, []);

  const themVaoGio = (item: GioHangItem) => {
    setGioHang(gioHangHienTai => {
      const gioHangLocal = JSON.parse(localStorage.getItem('gioHang') || '[]');
      
      const itemTonTai = gioHangLocal.find((x: GioHangItem) => x.maSach === item.maSach);
      
      let gioHangMoi;
      if (itemTonTai) {
        const soLuongMoi = itemTonTai.soLuong + item.soLuong;
        
        if (soLuongMoi > item.soLuongTon) {
          alert(`Số lượng sách không đủ. Chỉ còn ${item.soLuongTon} cuốn.`);
          return gioHangHienTai;
        }
        
        gioHangMoi = gioHangLocal.map((x: GioHangItem) => 
          x.maSach === item.maSach 
            ? {...x, soLuong: soLuongMoi}
            : x
        );
      } else {
        if (item.soLuong > item.soLuongTon) {
          throw new Error(`Số lượng sách không đủ. Chỉ còn ${item.soLuongTon} cuốn.`);
        }
        gioHangMoi = [...gioHangLocal, item];
      }
      
      localStorage.setItem('gioHang', JSON.stringify(gioHangMoi));
      
      return gioHangMoi;
    });
    
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
    
    toast.success('Đã thêm vào giỏ hàng!');
  };

  const xoaKhoiGio = (maSach: number) => {
    setGioHang(gioHangHienTai => 
      gioHangHienTai.filter(item => item.maSach !== maSach)
    );
    toast.success('Đã xóa sản phẩm!');
  };

  const capNhatSoLuong = (maSach: number, soLuong: number) => {
    if (soLuong < 1) return;
    
    setGioHang(gioHangHienTai =>
      gioHangHienTai.map(item =>
        item.maSach === maSach ? {...item, soLuong} : item
      )
    );
  };

  const tinhTongTien = () => {
    return gioHang.reduce((total, item) => total + (item.giaBan * item.soLuong), 0);
  };

  const soLuongSanPham = () => {
    return gioHang.reduce((total, item) => total + item.soLuong, 0);
  };

  return {
    gioHang,
    themVaoGio,
    xoaKhoiGio,
    capNhatSoLuong,
    tinhTongTien,
    soLuongSanPham
  };
};