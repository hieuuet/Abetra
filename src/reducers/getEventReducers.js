export const getEvent = (state = [], action = {}) => {
    switch (action.type) {
        case 'GET_EVENT':
            return action.payload;
        default:
            return state
    }
};
