import { Route } from "react-router-dom"

import Home from "../pages/home/Home"
import paths from "./paths"

const general = (
  <>
    <Route path={paths._} element={<Home />} />
  </>
)

export default general
