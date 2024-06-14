import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICompanies } from '../../model/model';

export const itemApi = createApi({
	reducerPath: 'itemApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://devapp.bonusmoney.pro/mobileapp/',
		prepareHeaders: async (headers) => {
			headers.set('content-type', 'application/json');
			headers.set('TOKEN', '123');
			return headers;
		},
		responseHandler: (response) => response.json(),
	}),
	tagTypes: [],
	endpoints: (builder) => ({
		allItems: builder.mutation<ICompanies, { offset: number; limit: number }>({
			query: ({ offset, limit }) => ({
				url: 'getAllCompanies',
				method: 'POST',
				body: {
					offset,
					limit,
				},
				responseHandler: (response) => response.json(),
			}),
		}),
		idealItems: builder.mutation({
			query: ({ offset, limit }) => ({
				url: 'getAllCompaniesIdeal',
				method: 'POST',
				body: {
					offset,
					limit,
				},
				responseHandler: (response) => response.json(),
			}),
		}),
		longItems: builder.mutation<ICompanies, { offset: number; limit: number }>({
			query: ({ offset, limit }) => ({
				url: 'getAllCompaniesLong',
				method: 'POST',
				body: {
					offset,
					limit,
				}
			}),
		}),
		errorItems: builder.mutation<ICompanies, { offset: number; limit: number }>({
			query: ({offset, limit}) => ({
				url: 'getAllCompaniesError',
				method: 'POST',
				body: {
					offset,
					limit,
				}
			}),
		}),
	}),
});

export const {
	useLongItemsMutation,
	useAllItemsMutation,
	useErrorItemsMutation,
	useIdealItemsMutation,
} = itemApi;
