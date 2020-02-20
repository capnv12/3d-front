import fetch from 'isomorphic-fetch'
import { API } from '../config'
import { handleResponse } from './auth'

export const createCategory = (categorie, token) => {
    return (
        fetch(`${API}/categorie-blog`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(categorie)
        })
            .then(response => {
                handleResponse(response)
                return response.json()
            })
            .catch(err => console.log(err))
    )
}
export const getCategories = () => {
    return (
        fetch(`${API}/categorii-blog`, {
            method: 'GET',
        })
            .then(response => {
                return response.json()
            })
            .catch(err => console.log(err))
    )
}
export const singleCategory = (slug) => {
    return (
        fetch(`${API}/categorie-blog/${slug}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json()
            })
            .catch(err => console.log(err))
    )
}

export const removeCategory = (slug, token) => {
    return (
        fetch(`${API}/categorie-blog/${slug}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => {
                handleResponse(response)
                return response.json()
            })
            .catch(err => console.log(err))
    )
}