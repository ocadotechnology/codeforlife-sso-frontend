import * as forms from "codeforlife/components/form"
import { FormHelperText, Stack } from "@mui/material"
import { type FC } from "react"

import { FruitNameField } from "../../components"
import { useCreateFruitMutation } from "../../api/fruit"

export interface CreateFruitFormProps {}

const CreateFruitForm: FC<CreateFruitFormProps> = () => (
  <>
    <FormHelperText>
      Use this form to add a new fruit to the list
    </FormHelperText>
    <forms.Form
      initialValues={{ name: "", is_citrus: false }}
      useMutation={useCreateFruitMutation}
      submitOptions={{
        then: () => {
          alert("successfully created fruit!")
        },
      }}
    >
      <Stack>
        <FruitNameField />
        <forms.CheckboxField
          name="is_citrus"
          formControlLabelProps={{ label: "Is Citrus" }}
        />
        <forms.SubmitButton>Create fruit</forms.SubmitButton>
      </Stack>
    </forms.Form>
  </>
)

export default CreateFruitForm
