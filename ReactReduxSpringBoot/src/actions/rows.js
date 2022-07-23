import axios from '../axios/axios';

const _getRows = (keyspace, table, rows) => ({
    type: 'GET_ROWS',
    keyspace,
    table,
    rows
});

export const getRows = (keyspace, table) => {
    return (dispatch) => {
        return axios.get(`keyspaces/${keyspace.keyspaceName}/tables/${keyspace.tableName}`).then(result => {
            const rows = [];
            result.data.forEach(item => {
                rows.push(item);
            });
            console.log(keyspace);
            console.log(rows);
            dispatch(_getRows(keyspace, table, rows));
        });
    };
};