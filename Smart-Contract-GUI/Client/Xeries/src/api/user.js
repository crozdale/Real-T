const axios = require('axios');


export const registerUser = (formData) => {
    return axios.post(`/users`, formData, {withCredentials: true});
}

export const loginUser = (formData) => {
    return axios.post(`/auth/login`, formData, {withCredentials: true});
}

export const logoutUser = () => {
    return axios.post(`/auth/logout`, {}, {withCredentials: true});
}

export const checkAuth = () => {
    return axios.post(`/auth/checkAuth`, {}, {withCredentials: true});
}

export const getProfile = () => {
    return axios.get(`/users/me`, {withCredentials: true});
}