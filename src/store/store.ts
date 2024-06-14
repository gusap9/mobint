import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { itemApi } from './api/itemApi';
import itemSlice from './slices/itemSlice';

const rootReducers = combineReducers({
	item: itemSlice,
	[itemApi.reducerPath]: itemApi.reducer,
});

export const store = configureStore({
	reducer: rootReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(itemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
