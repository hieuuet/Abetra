export const createMsgGroup = (state = [], action = {}) => {
    switch (action.type) {
        case 'CREATE_MSG_GROUP':
            return action.payload;
        default:
            return state
    }
};
