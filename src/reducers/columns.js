const columnsReducerDefaultState = [];

export default (state = columnsReducerDefaultState, action) => {
    switch (action.type) {
        
        case 'GET_COLUMNS':
            return action.columns;
        default:
            return state;
    }
};