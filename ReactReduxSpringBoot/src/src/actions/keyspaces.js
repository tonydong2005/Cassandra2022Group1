import axios from '../axios/axios';

const _getKeyspaces = (keyspaces) => ({
    type: 'GET_KEYSPACES',
    keyspaces
});

export const getKeyspaces = () => {
    return (dispatch) => {
        return axios.get('keyspaces').then(result => {
            const keyspaces = [];
            
            result.data.forEach(item => {
                keyspaces.push(item);
            });

            dispatch(_getKeyspaces(keyspaces));
        });
    };
};