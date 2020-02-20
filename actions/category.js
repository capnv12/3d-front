import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

export const createCategory = (category, token) => {
	return fetch(`${API}/categorie`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: category
	})
		.then(response => {
			// handleResponse(response)
			return response.json();
		})
		.catch(err => console.log(err));
};
export const getCategories = () => {
	return fetch(`${API}/categorii`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
export const singleCategory = slug => {
	return fetch(`${API}/categorie/${slug}`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const removeCategory = (slug, token) => {
	return fetch(`${API}/categorie/${slug}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			handleResponse(response);
			return response.json();
		})
		.catch(err => console.log(err));
};
