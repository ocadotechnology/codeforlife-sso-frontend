import * as pages from "codeforlife/components/page";
import { Stack, Typography } from "@mui/material";
import { type FC } from "react";
import { Image } from "codeforlife/components";

import { type OAuth2State, useOAuth2 } from "../../app/hooks";
import CflLogoImage from "../../images/cfl_logo.png";
import { LINK_CFL } from "../../app/settings";
import { SignInWithGoogleButton } from "../../components";

export interface HomeState extends OAuth2State {}

export interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { state, codeChallenge } = useOAuth2();

  return (
    <pages.Page>
      <pages.Section>
        <Stack direction="column" textAlign="center" alignItems="center">
          <Image
            src={CflLogoImage}
            alt="code for life logo"
            maxWidth="200px"
            href={LINK_CFL}
            hrefInNewTab
          />
          <Typography variant="h1">SSO Service</Typography>
          <SignInWithGoogleButton state={state} />
        </Stack>
      </pages.Section>
    </pages.Page>
  );
};

export default Home;
