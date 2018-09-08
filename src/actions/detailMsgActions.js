import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const loadDetailMsg = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.DETAIL_MSG, data,  dispatch);

        if (result) {
            dispatch({
                type: 'DETAIL_MSG',
                payload: result
            });
        }
        return result;
    }
}
