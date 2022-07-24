const rowsReducerDefaultState = [];

export default (state = rowsReducerDefaultState, action) => {
    switch (action.type) {
        
        case 'GET_ROWS':
            return action.rows;
        default:
            return state;
    }
};