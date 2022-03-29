import { productManageService } from "../../services/ProductManageService";
import { SET_LIST_PRODUCT } from "../types/ProductManageType";



export const getListProductAction = () => {
    return async (dispatch) => {
        try {
            const result = await productManageService.getListProduct();
            // sau khi lấy dữ liệu từ api về => redux
            dispatch({
                type: SET_LIST_PRODUCT,
                arrProduct: result.data.content
            })
        }catch(errors){
            console.log('errors', errors);
        }
    }
}