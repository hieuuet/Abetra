import { postRequestApi } from '../constant/callApi';
import { API } from '../constant/api';

export const uploadImage = (data = {}) => {
    return async (dispatch) => {
        let result = await postRequestApi(API.UPLOAD_IMAGE, data, dispatch);

        if (result) {
            dispatch({
                type: 'UPLOAD_IMAGE',
                payload: result,
            });
        }
        return result;
    };
};
