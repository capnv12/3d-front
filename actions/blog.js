import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createBlog = (blog, token) => {
	return fetch(`${API}/blog`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: blog
	})
		.then(response => {
			handleResponse(response);
			return response.json();
		})
		.catch(err => console.log(err));
};

export const list = () => {
	return fetch(`${API}/bloguri`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
	const data = {
		limit,
		skip
	};
	return fetch(`${API}/bloguri-categorii-etichete`, {
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

export const singleBlog = slug => {
	return fetch(`${API}/blog/${slug}`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const listRelated = blog => {
	return fetch(`${API}/bloguri/related`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(blog)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const removeBlog = (slug, token) => {
	return fetch(`${API}/blog/${slug}`, {
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

export const updateBlog = (blog, token, slug) => {
	return fetch(`${API}/blog/${slug}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: blog
	})
		.then(response => {
			handleResponse(response);
			return response.json();
		})
		.catch(err => console.log(err));
};

export const listSearch = params => {
	console.log('search params', params);
	let query = queryString.stringify(params);
	console.log('query params', query);
	return fetch(`${API}/bloguri/search?${query}`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
export const listByCreated = () => {
	return fetch(`${API}/bloguri/byDate`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
