import axios from 'axios';
import {
	setLoading,
	userLogin,
	setError,
	userLogout,
	resetUpdate,
	updateUserProfile,
	setUserOrders,
} from '../slices/user';

export const login = (email, password) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		//API REQUEST --- with email and password arguments only
		const { data } = await axios.post('/api/users/login', { email, password }, config);
		dispatch(userLogin(data));
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data
					? error.response.data
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
					? error.response.data
					: error.message
					? error.message
					: 'An unexpected error has occured. Please try again later.'
			)
		);
	}
};
export const updateProfile = (id, name, email, password) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(`/api/users/profile/${userInfo._id}`, { _id: id, email, password, name }, config);
		dispatch(userLogin(data));
		localStorage.setItem('userInfo', JSON.stringify(data));
		//Update Redux Store
		dispatch(updateUserProfile(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data
					? error.response.data
					: error.message
					? error.message
					: 'An unexpected error has occured. Please try again later.'
			)
		);
	}
};

export const resetUpdateSuccess = () => async (dispatch) => {
	dispatch(resetUpdate());
};

export const getUserOrders = () => async (dispatch, getState) => {
	dispatch(setLoading(true));
	//We destructure userInfo using Redux' getState method to access state
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.get(`/api/users/${userInfo._id}`, config);
		dispatch(setUserOrders(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data
					? error.response.data
					: error.message
					? error.message
					: 'An unexpected error has occured. Please try again later.'
			)
		);
	}
};
