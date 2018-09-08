export const loadMsgGroup = (state = [], action = {}) => {
    switch (action.type) {
        case 'LOAD_MSG_GROUP':
            return action.payload;
        default:
            return state
    }
};
