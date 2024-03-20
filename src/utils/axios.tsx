import axios from 'axios'

const token1 = localStorage.getItem('token')

export const baseurl = axios.create({
	baseURL: 'https://e-center-backend-gbuy.onrender.com/api',
	timeout: 5000,

<<<<<<< HEAD
  headers: {
    Authorization: `Bearer ${token1}`,
  },
});
=======
	headers: {
		Authorization: `Bearer ${token1}`,
	},
})
>>>>>>> 793419aa8d5d4d333d96975614b4569981a2c817
