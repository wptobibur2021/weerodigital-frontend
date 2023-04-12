import apiSlice from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin",
        method: "POST",
        body: data,
      }),
    }),
    loginAdmin: builder.mutation({
      query: (data)=>({
        url: "/admin/login",
        method: "POST",
        body: data
      })
    })
  }),
});

export const { useAddAdminMutation, useLoginAdminMutation} = adminApi;
