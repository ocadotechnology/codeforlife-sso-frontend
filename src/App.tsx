import { App as _App, type AppProps as _AppProps } from "codeforlife/components"
import { type FC } from "react"

import routes from "./routes"
import store from "./app/store"
import theme from "./app/theme"

export interface AppProps extends Pick<_AppProps, "path"> {}

const App: FC<AppProps> = props => (
  <_App store={store} theme={theme} routes={routes} {...props} />
)

export default App
