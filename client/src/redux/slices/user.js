import { createSlice } from '@reduxjs/toolkit';

//Don't forget to initialize default for state
export const initialState = {
	loading: false,
	error: null,
	userInfo: JSON.parse(localStorage.getItem('userInfo')) ?? null,
    updateSuccess: false,
    orders: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		userLogin: (state, { payload }) => {
			state.userInfo = payload;
			state.error = null;
			state.loading = false;
		},
		userLogout: (state) => {
			state.loading = false;
			state.error = null;
			state.userInfo = null;
		},
		setError: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		updateUserProfile: (state, { payload }) => {
			state.error = null;
			state.userInfo = payload;
			//Boolean to not have toast endless
			state.updateSuccess = true;
			state.loading = false;
		},
		resetUpdate: (state) => {
			state.updateSuccess = false;
		},
		setUserOrders: (state, { payload }) => {
			state.error = null;
			state.orders = payload;
			state.loading = false;
		},
	},
});

export const { setLoading, setError, userLogin, userLogout, updateUserProfile, resetUpdate, setUserOrders } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;
