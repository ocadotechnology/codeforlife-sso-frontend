import * as pages from "codeforlife/components/page"
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import { type FC } from "react"
import { LinkIconButton } from "codeforlife/components/router"
import { TablePagination } from "codeforlife/components"
import { generatePath } from "react-router"

import {
  useDestroyFruitMutation,
  useLazyListFruitsQuery,
} from "../../api/fruit"
import CreateFruitForm from "./CreateFruitForm"
import { paths } from "../../routes"

export interface FruitListProps {}

const FruitList: FC<FruitListProps> = () => {
  const [destroyFruit] = useDestroyFruitMutation()

  return (
    <pages.Page>
      <pages.Section>
        <TablePagination
          useLazyListQuery={useLazyListFruitsQuery}
          preferCacheValue
        >
          {fruits =>
            fruits.map(fruit => (
              <Stack direction="row" key={fruit.id} gap={5}>
                <Typography fontWeight="bold">{fruit.id}</Typography>
                <Typography>
                  {fruit.name} ({fruit.expires_on})
                </Typography>
                <FormControlLabel
                  control={<Checkbox disabled checked={fruit.is_citrus} />}
                  label="Is Citrus"
                />
                <LinkIconButton
                  to={generatePath(paths.fruits.id._, { id: fruit.id })}
                >
                  <EditIcon />
                </LinkIconButton>
                <IconButton
                  onClick={() => {
                    void destroyFruit(fruit.id)
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))
          }
        </TablePagination>
      </pages.Section>
      <pages.Section>
        <CreateFruitForm />
      </pages.Section>
    </pages.Page>
  )
}

export default FruitList
