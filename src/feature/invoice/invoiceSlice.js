import apiSlice from "../api/apiSlice";

export const invoiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addInvoice: builder.mutation({
      query: (data) => ({
        url: "/invoice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoice"],
    }),
    allInvoice: builder.query({
      query: () =>({
        url: "/invoice",
      }),
      providesTags: ["Invoice"],
    }),
    invoiceDeleteById: builder.mutation({
      query: (id) =>({
        url: `/invoice/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {useAddInvoiceMutation, useAllInvoiceQuery, useInvoiceDeleteByIdMutation } = invoiceSlice;
