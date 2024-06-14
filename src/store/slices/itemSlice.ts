import { createSlice } from '@reduxjs/toolkit';
import { ICompany } from '../../model/model';

const initialState: ICompany[] = [];

const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		setItems(state, action) {
			return (state = action.payload);
		},
		addItems(state, action) {
			return state.concat(action.payload);
		},
	},
});

export const { setItems, addItems } = itemSlice.actions;
export default itemSlice.reducer;
