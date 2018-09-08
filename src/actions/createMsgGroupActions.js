import {postRequestApi} from "../constant/callApi";
import {API} from "../constant/api";


export const createMsgGroup = (data = {}) => {
    return async dispatch => {

        let result = await postRequestApi( API.CREATE_MSG_GROUP, data,  dispatch);

        if (result) {
            dispatch({
                type: 'CREATE_MSG_GROUP',
                payload: result
            });
        }
        return result;
    }
}
