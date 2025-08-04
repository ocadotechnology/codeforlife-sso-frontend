import * as pages from "codeforlife/components/page"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { Google as GoogleIcon } from "@mui/icons-material"
import { Image } from "codeforlife/components"
import { LinkButton } from "codeforlife/components/router"

import { LINK_CFL, LINK_GOOGLE_LOGIN } from "../../app/settings"
import CflLogoImage from "../../images/cfl_logo.png"

export interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <pages.Page>
      <pages.Section>
        <Stack direction="column">
          <Image
            src={CflLogoImage}
            alt="code for life logo"
            maxWidth="200px"
            href={LINK_CFL}
            hrefInNewTab
          />
          <Typography variant="h1">SSO Service</Typography>
          <Typography>Log in with your Google Account.</Typography>
          <LinkButton
            to={LINK_GOOGLE_LOGIN}
            sx={({ spacing }) => ({
              padding: `${spacing(4)} ${spacing(5)}`,
              fontSize: "1.2rem",
              background: "black",
              color: "white.main",
            })}
            startIcon={<GoogleIcon sx={{ fontSize: "30px !important" }} />}
          >
            Log in with Google
          </LinkButton>
        </Stack>
      </pages.Section>
    </pages.Page>
  )
}

export default Home
