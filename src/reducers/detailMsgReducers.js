export const detailMsg = (state = [], action = {}) => {
    switch (action.type) {
        case 'DETAIL_MSG':
            return action.payload;
        default:
            return state
    }
};
