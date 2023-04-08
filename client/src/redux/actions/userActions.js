import axios from 'axios';
import { setLoading, userLogin, setError, userLogout } from '../slices/user';

export const login = (email, password) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		//if API successful, then data object is returned
		const { data } = await axios.post('/api/users/login', { email, password }, config);
		//Successful data object is dispatched and received as payload in slice, reducer userLogin
		dispatch(userLogin(data));
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data
					? error.response.data.message
					: error.message
					? error.message
					: 'An unexpected error has occured. Please try again later.'
			)
		);
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo');
	dispatch(userLogout());
};

export const register = (name, email, password) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		//if API successful, then data object is returned
		const { data } = await axios.post('/api/users/register', { email, password, name }, config);
		//Successful data object is dispatched and received as payload in slice, reducer userLogin
		dispatch(userLogin(data));
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data
					? error.response.data.message
					: error.message
					? error.message
					: 'An unexpected error has occured. Please try again later.'
			)
		);
	}
};
