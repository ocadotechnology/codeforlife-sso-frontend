import { createApi } from "codeforlife/api"

const api = createApi({
  tagTypes: ["Fruit"],
})

export default api
export const { useLogoutMutation } = api
