import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const getEvent = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.GET_EVENT, data,  dispatch);

        if (result) {
            dispatch({
                type: 'GET_EVENT',
                payload: result
            });
        }
        return result;
    }
}
