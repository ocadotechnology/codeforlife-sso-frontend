import { server } from "codeforlife/server/entry"

import App from "./App"
import routes from "./routes"

export const { render } = await server({ App, routes })
