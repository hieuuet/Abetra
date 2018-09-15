import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const searchCmt = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.SEARCH_CMT, data,  dispatch);

        if (result) {
            dispatch({
                type: 'SEARCH_CMT',
                payload: result
            });
        }
        return result;
    }
}
