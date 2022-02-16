const axios = require('axios');

export const getListings = (category = 'all') => {
    return axios.post(`/listing/${category}`, {}, {withCredentials: true});
}

export const getMyListings = () => {
    const id = localStorage.getItem('id');
    return axios.get(`/listing/user/${id}`, {withCredentials: true});
}

export const getUserListings = (username) => {
    return axios.get(`/listing/personal/${username}`, {withCredentials: true});
}

export const addListing = (data) => {
    return axios.post(`/listing`, data, {withCredentials: true});
}

export const updateListing = (itemId, data) => {
    return axios.patch(`/listing/${itemId}`, data, {withCredentials: true});
}

export const getListingDetails = (itemId) => {
    return axios.get(`/listing/${itemId}`, {withCredentials: true});
}

export const deleteListing = (itemId) => {
    return axios.delete(`/listing/${itemId}`, {withCredentials: true});
}