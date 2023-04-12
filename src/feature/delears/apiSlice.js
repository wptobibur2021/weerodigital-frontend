import apiSlice from "../api/apiSlice";

export const delearApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDealer: builder.mutation({
      query: (data) => ({
        url: "/dealer",
        method: "POST",
        body: data,
      }),
    }),
    allDealer: builder.query({
      query: () =>({
        url: "/dealer",
      }),
      providesTags: ["Dealer"],
    }),
    dealerDeleteById: builder.mutation({
      query: (id) =>({
        url: `/dealer/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Dealer"],
    }),
    loginDealer: builder.mutation({
      query: (data)=>({
        url: "/dealer/login",
        method: "POST",
        body: data
      })
    })
  }),
});

export const { useAddDealerMutation, useAllDealerQuery, useLoginDealerMutation, useDealerDeleteByIdMutation } = delearApi;
