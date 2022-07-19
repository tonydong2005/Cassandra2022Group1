import axios from '../axios/axios';

const _getTables = (keyspace, tables) => ({
    type: 'GET_TABLES',
    keyspace,
    tables
});

export const getTables = (keyspace, tables) => {
    return (dispatch) => {
        return axios.get(`keyspaces/${keyspace.keyspaceName}`).then(result => {
            tables = [];
            console.log({keyspace});
            result.data.forEach(item => {
                tables.push(item);
            });
            console.log(tables);
            dispatch(_getTables(keyspace, tables));
        });
    };
};