import * as forms from "codeforlife/components/form"
import * as pages from "codeforlife/components/page"
import * as yup from "yup"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { handleQueryState } from "codeforlife/utils/api"
import { submitForm } from "codeforlife/utils/form"
import { useParamsRequired } from "codeforlife/hooks"

import {
  useLazyRetrieveFruitQuery,
  useUpdateFruitMutation,
} from "../../api/fruit"
import { FruitNameField } from "../../components"
import { paths } from "../../routes"

export interface FruitDetailProps {}

const FruitDetail: FC<FruitDetailProps> = () => {
  const [updateFruit] = useUpdateFruitMutation()
  const [retrieveFruit, retrieveFruitResult] = useLazyRetrieveFruitQuery()

  return useParamsRequired({
    shape: { id: yup.number().required().min(1) },
    children: () =>
      handleQueryState(retrieveFruitResult, fruit => (
        <pages.Page>
          <pages.Section>
            <Typography variant="h1">Update fruit</Typography>
            <forms.Form
              initialValues={fruit}
              onSubmit={submitForm(updateFruit, {
                exclude: ["expires_on"],
                then: () => {
                  alert("successfully updated fruit")
                },
              })}
            >
              <Stack>
                <FruitNameField />
                <forms.CheckboxField
                  name="is_citrus"
                  formControlLabelProps={{ label: "Is Citrus" }}
                />
                <forms.SubmitButton>Update fruit</forms.SubmitButton>
              </Stack>
            </forms.Form>
          </pages.Section>
          <pages.Section>
            <Link className="back-to" to={paths.fruits._}>
              fruit list
            </Link>
          </pages.Section>
        </pages.Page>
      )),
    onValidationSuccess: params => {
      void retrieveFruit(params.id, true)
    },
    onValidationError: navigate => {
      navigate(paths.fruits._, {
        state: {
          notifications: [
            { props: { error: true, children: "Failed to get params" } },
          ],
        },
      })
    },
  })
}

export default FruitDetail
