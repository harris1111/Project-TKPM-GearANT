import axios from "axios";
import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSEL } from "../types/CarouselType";
import { productManageService } from "../../services/ProductManageService";
export const getCarouselAction = () => {


    return async (dispatch) => {
        try {
            const result = await productManageService.getListBanner();
            dispatch({
                type: SET_CAROUSEL,
                arrImg: result.data.content
            })
        } catch (errors){
            console.log('errors', errors)
        }
    }
}