import axios from 'axios';
import {
	setLoading,
	setError,
	getUsers,
	getOrders,
	userDelete,
	orderDelete,
	resetError,
	setDeliveredFlag,
} from '../slices/admin';

import { setProductUpdateFlag, setProducts, setReviewRemovalFlag } from '../slices/products';

export const getAllUsers = () => async (dispatch, getState) => {
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

		const { data } = await axios.get('api/users', config);
		dispatch(getUsers(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Users could not be fetched.'
			)
		);
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
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

		const { data } = await axios.delete(`api/users/${id}`, config);
		dispatch(userDelete(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'User could not be deleted.'
			)
		);
	}
};

export const getAllOrders = () => async (dispatch, getState) => {
	dispatch(setLoading(true));
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

		const { data } = await axios.get('api/orders', config);
		dispatch(getOrders(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Orders could not be fetched.'
			)
		);
	}
};

export const deleteOrder = (id) => async (dispatch, getState) => {
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

		const { data } = await axios.delete(`api/orders/${id}`, config);
		dispatch(orderDelete(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Order could not be deleted.'
			)
		);
	}
};
export const setDelivered = (id) => async (dispatch, getState) => {
	dispatch(setLoading(true));
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

		await axios.put(`api/orders/${id}`, {}, config);
		dispatch(setDeliveredFlag());
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Order could not be updated.'
			)
		);
	}
};

//update product
export const updateProduct =
	(brand, name, category, stock, price, id, productIsNew, description, image) => async (dispatch, getState) => {
		//We need userInfo to extract token to check if user is an administrator.
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
			//We are going to make a request from the server and provide our credentials.
			const { data } = await axios.put(
				`api/products/`,
				{ brand, name, category, stock, price, id, productIsNew, description, image },
				config
			);
			//setProducts will be the slice that updates state?
			dispatch(setProducts(data));
			//this reducer function will automatically set productUpdateFlag to true which we will most likely pass to our useEffect function.
			dispatch(setProductUpdateFlag());
		} catch (error) {
			dispatch(
				setError(
					error.response && error.response.data.message
						? error.response.data.message
						: error.message
						? error.message
						: 'Product could not be updated.'
				)
			);
		}
	};

//delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
	//We need userInfo to extract token to check if user is an administrator.
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
		//We are going to make a request from the server and provide our credentials.
		const { data } = await axios.delete(`api/products/${id}`, config);
		//setProducts pretty much shows what products are available
		dispatch(setProducts(data));
		//this reducer function will automatically set productUpdateFlag to true which we will most likely pass to our useEffect function.
		dispatch(setProductUpdateFlag());
		dispatch(resetError());
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Product could not be removed.'
			)
		);
	}
};
//upload product
export const uploadProduct = (newProduct) => async (dispatch, getState) => {
	//We need userInfo to extract token to check if user is an administrator.
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
		//We are going to make a request from the server and provide our credentials.
		const { data } = await axios.post(`api/products/`, newProduct, config);
		//setProducts will be the slice that updates state?
		dispatch(setProducts(data));
		//this reducer function will automatically set productUpdateFlag to true which we will most likely pass to our useEffect function.
		dispatch(setProductUpdateFlag());
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Product could not be uploaded.'
			)
		);
	}
};

export const resetErrorAndRemoval = () => async (dispatch) => {
	dispatch(resetError());
};

export const removeReview = (productId, reviewId) => async (dispatch, getState) => {
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
		const { data } = await axios.put(`api/products/${productId}/${reviewId}`, {}, config);
		dispatch(setProducts(data));
		dispatch(setReviewRemovalFlag());
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Review could not be removed.'
			)
		);
	}
};
