import { baseService } from "./baseService";

export class ProductManageService extends baseService {
    constructor() {
        super();
    }
    getListBanner = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
    }
    getListProduct = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP00`);
    }
}

export const productManageService = new ProductManageService();