import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const loadSavePost = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.LOAD_SAVE_POST, data,  dispatch);

        if (result) {
            dispatch({
                type: 'LOAD_SAVE_POST',
                payload: result
            });
        }
        return result;
    }
}
export const savePost = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.SAVE_POST, data,  dispatch);

        if (result) {
            dispatch({
                type: 'SAVE_POST',
                payload: result
            });
        }
        return result;
    }
}

