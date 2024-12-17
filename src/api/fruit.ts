import {
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type ListArg,
  type ListResult,
  type Model,
  type RetrieveArg,
  type RetrieveResult,
  type UpdateArg,
  type UpdateResult,
  buildUrl,
  modelUrls,
  tagData,
} from "codeforlife/utils/api"

import api from "."

export type Fruit = Model<
  number,
  {
    name: string
    is_citrus: boolean
    expires_on: string
  }
>

const fruitUrls = modelUrls("fruits/", "fruits/<id>/")

export type RetrieveFruitResult = RetrieveResult<
  Fruit,
  "name" | "is_citrus" | "expires_on"
>
export type RetrieveFruitArg = RetrieveArg<Fruit>

export type ListFruitsResult = ListResult<
  Fruit,
  "name" | "is_citrus" | "expires_on"
>
export type ListFruitsArg = ListArg

export type CreateFruitResult = CreateResult<
  Fruit,
  "name" | "is_citrus" | "expires_on"
>
export type CreateFruitArg = CreateArg<Fruit, "name" | "is_citrus">

export type UpdateFruitResult = UpdateResult<
  Fruit,
  "name" | "is_citrus" | "expires_on"
>
export type UpdateFruitArg = UpdateArg<Fruit, never, "name" | "is_citrus">

export type DestroyFruitResult = DestroyResult
export type DestroyFruitArg = DestroyArg<Fruit>

const fruitApi = api.injectEndpoints({
  endpoints: build => ({
    retrieveFruit: build.query<RetrieveFruitResult, RetrieveFruitArg>({
      query: id => ({
        url: buildUrl(fruitUrls.detail, { url: { id } }),
        method: "GET",
      }),
      providesTags: tagData("Fruit"),
    }),
    listFruits: build.query<ListFruitsResult, ListFruitsArg>({
      query: search => ({
        url: buildUrl(fruitUrls.list, { search }),
        method: "GET",
      }),
      providesTags: tagData("Fruit", { includeListTag: true }),
    }),
    createFruit: build.mutation<CreateFruitResult, CreateFruitArg>({
      query: body => ({
        url: fruitUrls.list,
        method: "POST",
        body,
      }),
      invalidatesTags: tagData("Fruit", { includeListTag: true }),
    }),
    updateFruit: build.mutation<UpdateFruitResult, UpdateFruitArg>({
      query: ({ id, ...body }) => ({
        url: buildUrl(fruitUrls.detail, { url: { id } }),
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagData("Fruit"),
    }),
    destroyFruit: build.mutation<DestroyFruitResult, DestroyFruitArg>({
      query: id => ({
        url: buildUrl(fruitUrls.detail, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("Fruit", { includeListTag: true }),
    }),
  }),
})

export default fruitApi
export const {
  useRetrieveFruitQuery,
  useLazyRetrieveFruitQuery,
  useListFruitsQuery,
  useLazyListFruitsQuery,
  useCreateFruitMutation,
  useUpdateFruitMutation,
  useDestroyFruitMutation,
} = fruitApi
