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

export const getCart = () => {
    return axios.get(`/users/cart`, {withCredentials: true});
}

export const getCartPopulated = () => {
    return axios.get(`/users/cartPopulated`, {withCredentials: true});
}

export const addItemToCart = (_id) => {
    return axios.post(`/users/cart`, {_id}, {withCredentials: true});
}

export const updateCart = (items) => {
    return axios.patch(`/users/cart`, items, {withCredentials: true});
}

export const getOrders = () => {
    return axios.get(`/users/myOrders`, {withCredentials: true});
}

export const checkout = (order) => {
    return axios.post(`/users/checkout`,order , {withCredentials: true});
}