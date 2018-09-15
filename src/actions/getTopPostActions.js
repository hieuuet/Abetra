import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const getTopPost = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.GET_TOP_POST, data,  dispatch);

        if (result) {
            dispatch({
                type: 'GET_TOP_POST',
                payload: result
            });
        }
        return result;
    }
}
