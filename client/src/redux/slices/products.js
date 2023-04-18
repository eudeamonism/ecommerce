import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	loading: false,
	error: null,
	products: [],
	product: null,
	reviewSend: false,
};

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		setProducts: (state, { payload }) => {
			state.loading = false;
			state.error = null;
			state.products = payload;
		},
		setProduct: (state, { payload }) => {
			state.loading = false;
			state.error = null;
			state.product = payload;
		},
		setError: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		productReviewed: (state) => {
			state.loading = false;
			state.error = null;
			state.reviewSend = true;
		},
		resetError: (state) => {
			state.error = null;
			state.reviewSend = false;
		},
	},
});

export const { setLoading, setError, setProducts, setProduct, productReviewed, resetError } = productSlice.actions;

export default productSlice.reducer;

export const productsSelector = (state) => state.products;
