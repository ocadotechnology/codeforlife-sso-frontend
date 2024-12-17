import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { Image } from "codeforlife/components"
import { Link } from "codeforlife/components/router"
import { Typography } from "@mui/material"

import CflLogoImage from "../../images/cfl_logo.png"
import { paths } from "../../routes"

export interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <pages.Page>
      <pages.Section>
        <Image src={CflLogoImage} alt="code for life logo" maxWidth="200px" />
        <Typography variant="h1">Example web page</Typography>
        <Typography>
          This is an example of how you can create a web page. This example
          consumes the backend-template&apos;s API.
        </Typography>
        <Link to={paths.fruits._}>Fruit list</Link>
      </pages.Section>
    </pages.Page>
  )
}

export default Home
