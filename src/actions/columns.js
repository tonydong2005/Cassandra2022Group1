import axios from '../axios/axios';

const _getColumns = (keyspace, table, columns) => ({
    type: 'GET_COLUMNS',
    keyspace,
    table,
    columns
});

export const getColumns = (keyspace, table) => {
    return (dispatch) => {
        return axios.get(`keyspaces/${keyspace.keyspaceName}/tables/${keyspace.tableName}/columnNames`).then(result => {
            const columns = [];
            result.data.forEach(item => {
                columns.push({field: item, filter: true});
            });
            console.log(keyspace);
            console.log(columns);
            dispatch(_getColumns(keyspace, table, columns));
        });
    };
};