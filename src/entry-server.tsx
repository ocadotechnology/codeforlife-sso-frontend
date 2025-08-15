import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import App from "./App"

export function render(path: string) {
  return {
    html: renderToString(
      <StrictMode>
        <App path={path} />
      </StrictMode>,
    ),
  }
}
