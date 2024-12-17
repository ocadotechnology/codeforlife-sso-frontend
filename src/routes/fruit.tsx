import { Route } from "react-router-dom"

import FruitDetail from "../pages/fruitDetail/FruitDetail"
import FruitList from "../pages/fruitList/FruitList"
import paths from "./paths"

const fruit = (
  <>
    <Route path={paths.fruits.id._} element={<FruitDetail />} />
    <Route path={paths.fruits._} element={<FruitList />} />
  </>
)

export default fruit
