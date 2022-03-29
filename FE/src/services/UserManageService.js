import { baseService } from "./baseService";

export class UserManageService extends baseService {
    constructor() {
        super();
    }


    Login = (inforLogin) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,inforLogin);
    }
} 
 
export const userManageService = new UserManageService();