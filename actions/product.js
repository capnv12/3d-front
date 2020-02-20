import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createProduct = (product, token) => {
	return fetch(`${API}/produs`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: product
	})
		.then(response => {
			handleResponse(response);
			return response.json();
		})
		.catch(err => console.log(err));
};

export const listAllProductsCategories = (skip, limit) => {
	const data = {
		limit,
		skip
	};
	return fetch(`${API}/produse-categorii`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const singleProduct = slug => {
	return fetch(`${API}/produs/${slug}`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const listRelated = product => {
	return fetch(`${API}/produse/related`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(product)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const removeProduct = (slug, token) => {
	return fetch(`${API}/produs/${slug}`, {
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

export const updateProduct = (product, token, slug) => {
	return fetch(`${API}/produs/${slug}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: product
	})
		.then(response => {
			handleResponse(response);
			return response.json();
		})
		.catch(err => console.log(err));
};

export const listSearch = params => {
	// console.log('search params', params);
	let query = queryString.stringify(params);
	// console.log('query params', query);
	return fetch(`${API}/produse/search?${query}`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const list = () => {
	return fetch(`${API}/produse`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
export const listByNew = () => {
	return fetch(`${API}/produse/nou`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
export const listBySold = () => {
	return fetch(`${API}/produse/vandut`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
	const data = {
		limit,
		skip,
		filters
	};

	return fetch(`${API}/produse/filtre`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};
export const getFilteredProductsByBrand = (skip, limit, slug, filters = {}) => {
	const data = {
		limit,
		skip,
		filters
	};

	return fetch(`${API}/produse/filtreByBrand/${slug}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};
