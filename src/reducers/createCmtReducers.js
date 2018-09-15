export const createCmt = (state = [], action = {}) => {
    switch (action.type) {
        case 'CREATE_CMT':
            return action.payload;
        default:
            return state
    }
};
