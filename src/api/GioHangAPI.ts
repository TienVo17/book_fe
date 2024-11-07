import { my_request } from "./Request";
import GioHangModel from "../models/GioHangModel";

export async function themVaoGioHang(gioHangData: any) {
    try {
        // Log dữ liệu gửi đi
        console.log('Dữ liệu gửi đi:', {
            maNguoiDung: gioHangData.maNguoiDung,
            maSach: gioHangData.maSach,
            soLuong: gioHangData.soLuong
        });

        const response = await fetch('http://localhost:8080/gio-hang/them', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(gioHangData)
        });

        // Log response status và body
        const responseBody = await response.text();
        console.log('Response status:', response.status);
        console.log('Response body:', responseBody);

        if (!response.ok) {
            throw new Error(`Lỗi khi thêm vào giỏ hàng: ${responseBody}`);
        }

        return responseBody ? JSON.parse(responseBody) : null;
    } catch (error) {
        console.error('Chi tiết lỗi:', error);
        throw error;
    }
}