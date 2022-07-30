import axios from '../axios/axios';

const _getRows = (keyspace, table, rows) => ({
    type: 'GET_ROWS',
    keyspace,
    table,
    rows
});

export const getRows = (keyspace, table) => {
    return (dispatch) => {
        return axios.get(`keyspaces/${keyspace.keyspaceName}/tables/${keyspace.tableName}/columnNames`).then(result1 => {
            
            return axios.get(`keyspaces/${keyspace.keyspaceName}/tables/${keyspace.tableName}`).then(result => {
            
            const rows = [];
            
            result.data.forEach(item => {
                const temp = {};
                for (let i = 0; i < result1.data.length; i++) {
                    temp[result1.data[i]] = item[i];
                }
                rows.push(temp);
            });

            console.log(keyspace);
            console.log(rows);
            dispatch(_getRows(keyspace, table, rows));
            });
        });
    };
};