import { baseApi } from "../../baseApi/baseApi";


const historyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createHistory: builder.mutation({
            query: (data) => ({
                url: '/analysis-history',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['History'],
        }),
        getAllHistory: builder.query({
            query: () => ({
                url: '/analysis-history',
                method: 'GET',
            }),
            providesTags: ['History'],
        })
    }),
})

export const { useCreateHistoryMutation , useGetAllHistoryQuery } = historyApi