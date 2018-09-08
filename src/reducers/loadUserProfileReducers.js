export const loadUserProfile = (state = [], action = {}) => {
    switch (action.type) {
        case 'LOAD_USER_PROFILE':
            return action.payload;
        default:
            return state
    }
};
