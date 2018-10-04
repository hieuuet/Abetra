import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const likePost = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.LIKE_POST, data,  dispatch);

        if (result) {
            dispatch({
                type: 'LIKE_POST',
                payload: result
            });
        }
        return result;
    }
}
