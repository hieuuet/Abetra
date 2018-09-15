export const searchCmt = (state = [], action = {}) => {
    switch (action.type) {
        case 'SEARCH_CMT':
            return action.payload;
        default:
            return state
    }
};
