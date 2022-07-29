import axios from '../axios/axios';

const _getTables = (keyspace, tables) => ({
    type: 'GET_TABLES',
    keyspace,
    tables
});

export const getTables = (keyspace) => {
    return (dispatch) => {
        return axios.get(`keyspaces/${keyspace.keyspaceName}/tables`).then(result => {
            const tables = [];
            console.log({keyspace});
            result.data.forEach(item => {
                tables.push(item);
            });
            console.log(tables);
            dispatch(_getTables(keyspace, tables));
        });
    };
};