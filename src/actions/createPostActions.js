import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const createPost = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.CREATE_POST, data,  dispatch);

        if (result) {
            dispatch({
                type: 'CREATE_POST',
                payload: result
            });
        }
        return result;
    }
}
