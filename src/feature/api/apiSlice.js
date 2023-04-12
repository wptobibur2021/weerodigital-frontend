import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "API",
  // https://weerodigital-backendend.vercel.app/
  // http://localhost:8000/api/v1/
  baseQuery: fetchBaseQuery({
    baseUrl: "https://weerodigital-backendend.vercel.app/api/v1/"
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Dealer", "Product", "Invoice"],
});
export default apiSlice;
