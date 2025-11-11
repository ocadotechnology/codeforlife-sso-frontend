import { client } from "codeforlife/server/entry"

import App from "./App"
import routes from "./routes"

await client({ App, routes })
