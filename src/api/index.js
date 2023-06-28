import axios from 'axios';

const DOMAIN = 'https://swapi.dev/api/';
const PEOPLE_API_URL = 'https://swapi.dev/api/people';

const axiosInstance = axios.create({
	baseURL: DOMAIN,
	timeout: 15000,
});

const getAPIRequest = (route) => {
	return axiosInstance.get(route);
};

export { PEOPLE_API_URL, getAPIRequest };
