const axios = require('axios');


export const registerAdmin = (formData) => {
    return axios.post(`/admins`, formData, {withCredentials: true});
}

export const loginAdmin = (formData) => {
    return axios.post(`/auth/login`, formData, {withCredentials: true});
}

export const getStatistics = () => {
    return axios.post(`/admins/statistics`, {}, {withCredentials: true});
}

export const getUsers = () => {
    return axios.get(`/users`, {withCredentials: true});
}

export const getAdmins = () => {
    return axios.get(`/admins`, {withCredentials: true});
}

export const getSubscribers = () => {
    return axios.get(`/subscribe`, {withCredentials: true});
}

export const getTexts = () => {
    return axios.get(`/admins/texts`);
}

export const updateTexts = (formData) => {
    return axios.patch(`/admins/texts`, formData, {withCredentials: true});
}

export const updateRow = (path,formData) => {
    return axios.patch(`/${path}`, formData, {withCredentials: true});
}

export const deleteRow = (path,formData) => {
    return axios.delete(`/${path}/${formData._id}`, {withCredentials: true});
}