import axios from 'axios';
import { setError, shippingAddressAdd } from '../slices/order';

//Need to know what is going on for the two variables below?
export const setShippingAddress = (data) => (dispatch) => {
	dispatch(shippingAddressAdd(data));
};

export const setShippingError = (value) => (dispatch) => {
	dispatch(setError(value));
};

export const createOrder = (order) => async (dispatch, getState) => {
	const {
		order: { shippingAddress },
		user: { userInfo },
	} = getState();

	const preparedOrder = { ...order, shippingAddress };
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('api/orders', preparedOrder, config);
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
