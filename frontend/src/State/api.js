import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "authAPI",
  tagTypes: [],
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body: body,
      }),
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: "product/addproduct",
        method: "POST",
        body,
      }),
    }),
    getProducts: build.query({
      query: () => ({
        url: "product/getproduct",
        method: "GET",
      }),
    }),
    
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useAddProductMutation,
  useGetProductsQuery,
} = api;
export { api };
