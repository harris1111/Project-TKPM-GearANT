import { history } from "../../App";
import { userManageService } from "../../services/UserManageService";
import { LOGIN_ACTION } from "../types/UserManageType";


export const LoginAction = (inforLogin) => {
    


    return async (dispatch) => {
        try{
            const result = await userManageService.Login(inforLogin);
             
            if (result.data.statusCode === 200){
                dispatch({
                    type: LOGIN_ACTION,
                    inforLogin: result.data.content
                });
                // chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }
            console.log('result', result);
        }catch(error){
            console.log('error', error.response.data);
        }
    }
}