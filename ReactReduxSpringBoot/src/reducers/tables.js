const tablesReducerDefaultState = [];

export default (state = tablesReducerDefaultState, action) => {
    switch (action.type) {
        
        case 'GET_TABLES':
            return action.tables;
        default:
            return state;
    }
};