import { createApi } from "codeforlife/api"

const api = createApi({
  tagTypes: [],
})

export default api
export const { useLogoutMutation } = api
