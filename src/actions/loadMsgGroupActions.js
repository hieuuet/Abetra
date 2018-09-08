import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const loadMsgGroup = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.LOAD_MSG_GROUP, data,  dispatch);

        if (result) {
            dispatch({
                type: 'LOAD_MSG_GROUP',
                payload: result
            });
        }
        return result;
    }
}
