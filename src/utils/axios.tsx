import axios from 'axios'

const token1 = localStorage.getItem('token')

export const baseurl = axios.create({
	baseURL: 'https://e-center-backend-gbuy.onrender.com/api',
	timeout: 5000,

	headers: {
		Authorization: `Bearer ${token1}`,
		Accept: `application/json`
	},
})
