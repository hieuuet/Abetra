export const likePost = (state = [], action = {}) => {
    switch (action.type) {
        case 'LIKE_POST':
            return action.payload;
        default:
            return state
    }
};
