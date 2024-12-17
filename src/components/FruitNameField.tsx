import { TextField, type TextFieldProps } from "codeforlife/components/form"
import { type FC } from "react"

import { fruitNameSchema } from "../app/schemas"

export interface FruitNameFieldProps
  extends Omit<TextFieldProps, "name" | "label" | "placeholder" | "schema"> {}

const FruitNameField: FC<FruitNameFieldProps> = props => (
  <TextField
    name="name"
    label="Name"
    placeholder="Enter the fruit's name"
    schema={fruitNameSchema}
    {...props}
  />
)

export default FruitNameField
