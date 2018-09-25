export const loadSavePost = (state = [], action = {}) => {
    switch (action.type) {
        case 'LOAD_SAVE_POST':
            return action.payload;
        default:
            return state
    }
};
