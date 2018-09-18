export const searchPost = (state = [], action = {}) => {
    switch (action.type) {
        case 'SEARCH_POST':
            return action.payload;
        default:
            return state
    }
};
