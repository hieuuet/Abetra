export const getTopPost = (state = [], action = {}) => {
    switch (action.type) {
        case 'GET_TOP_POST':
            return action.payload;
        default:
            return state
    }
};
