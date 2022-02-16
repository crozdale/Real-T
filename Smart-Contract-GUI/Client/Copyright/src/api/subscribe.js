const axios = require('axios');


export const subscribe = (formData) => {
    return axios.post(`/subscribe`, formData);
}