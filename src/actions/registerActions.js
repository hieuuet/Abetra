import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const postRegister = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.REGISTER, data,  dispatch);

        if (result) {
            dispatch({
                type: 'REGISTER',
                payload: result
            });
        }
        return result;
    }
}
