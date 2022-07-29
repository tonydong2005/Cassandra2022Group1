const keyspacesReducerDefaultState = [];

export default (state = keyspacesReducerDefaultState, action) => {
    switch (action.type) {
        
        case 'GET_KEYSPACES':
            return action.keyspaces;
        default:
            return state;
    }
};