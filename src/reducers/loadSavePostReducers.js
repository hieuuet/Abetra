export const loadSavePost = (state = [], action = {}) => {
    switch (action.type) {
        case 'LOAD_SAVE_POST':
            return action.payload;
        default:
            return state
    }
};
export const savePost = (state = [], action = {}) => {
    switch (action.type) {
        case 'SAVE_POST':
            return action.payload;
        default:
            return state
    }
};
export const unsavePost = (state = [], action = {}) => {
    switch (action.type) {
        case 'UNSAVE_POST':
            return action.payload;
        default:
            return state
    }
};

