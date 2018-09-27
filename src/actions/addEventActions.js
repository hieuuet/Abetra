import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const addEvent = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.ADD_EVENT, data,  dispatch);

        if (result) {
            dispatch({
                type: 'ADD_EVENT',
                payload: result
            });
        }
        return result;
    }
}
