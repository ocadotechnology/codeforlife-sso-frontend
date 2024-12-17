import { path as _ } from "codeforlife/utils/router"

const paths = _("", {
  fruits: _("/fruits", {
    id: _("/:id"),
  }),
})

export default paths
