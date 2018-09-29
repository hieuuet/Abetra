import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const joinEvent = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.JOIN_EVENT, data,  dispatch);

        if (result) {
            dispatch({
                type: 'JOIN_EVENT',
                payload: result
            });
        }
        return result;
    }
}
