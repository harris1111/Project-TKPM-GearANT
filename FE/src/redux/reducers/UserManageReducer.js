import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { LOGIN_ACTION } from "../types/UserManageType"

let user = {};
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
 

const stateDefault = {
    userLogin: user
}

export const UserManageReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOGIN_ACTION: {
            const {inforLogin} = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(inforLogin));
            localStorage.setItem(TOKEN, inforLogin.accessToken);
            return {...state, userLogin:inforLogin}
        }
        default:
            return {...state}
    }
}