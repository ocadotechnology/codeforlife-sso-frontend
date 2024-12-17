import {
  type ThemeOptions,
  createTheme,
  responsiveFontSizes,
} from "@mui/material"
import { themeOptions as cflThemeOptions } from "codeforlife/theme"

// Unpack the base options to extend the theme
export const themeOptions: ThemeOptions = {
  ...cflThemeOptions,
}

const theme = responsiveFontSizes(createTheme(themeOptions))

export default theme
