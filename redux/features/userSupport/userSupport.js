import { baseApi } from "../../baseApi/baseApi";

const userSupportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAlluserSupport: builder.query({
            query: ({ page, limit }) => ({
                url: `/support-messages/paginate?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["UserSupport"],
        }),
        statusUpdate: builder.mutation({
            query: (id) => ({
                url: `/support-messages/change-satus/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["UserSupport"],
        }),
    }),
});

export const { useGetAlluserSupportQuery, useStatusUpdateMutation } = userSupportApi;