import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const createCmt = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.CREATE_CMT, data,  dispatch);

        if (result) {
            dispatch({
                type: 'CREATE_CMT',
                payload: result
            });
        }
        return result;
    }
}
