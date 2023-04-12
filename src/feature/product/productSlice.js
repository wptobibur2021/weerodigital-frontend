import apiSlice from "../api/apiSlice";

export const productAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    allProduct: builder.query({
      query: () =>({
        url: "/product",
      }),
      providesTags: ["Product"],
    }),
    productDeleteById: builder.mutation({
      query: (id) =>({
        url: `/product/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useAddProductMutation, useAllProductQuery, useProductDeleteByIdMutation  } = productAPI;
