const axios = require('axios');

const HOST = process.env.VUE_APP_SEQUENCE_SERVICE_HOST;
const PATH = process.env.VUE_APP_SEQUENCE_SERVICE_PATH;

const processSequence = async (seqList) => {
    console.log('calling process service to process the seq list');

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const requestPayload = {
        payload: seqList
    };

    const url = 'https://' + HOST + '' + PATH;

    return await axios.post(url, requestPayload,{
        headers: headers
    })
        .then(res => {
            return res.data;
        }).catch(error => {
            console.error('an error occurred while fetching processed seq list', error);
        });
};

module.exports = {
    processSequence
};
