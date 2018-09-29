export const joinEvent = (state = [], action = {}) => {
    switch (action.type) {
        case 'JOIN_EVENT':
            return action.payload;
        default:
            return state
    }
};
