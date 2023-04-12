import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/"
    // prepareHeaders: async (headers, { getState }) => {
    //   const token = getState()?.auth?.accessToken;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Dealer", "Product", "Invoice"],
});
export default apiSlice;
