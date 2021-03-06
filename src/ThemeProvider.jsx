import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles"
import { cyan, deepOrange } from "@material-ui/core/colors"

import React from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"

export const ThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  let theme = createMuiTheme({
    typography: {
      fontFamily: "Indie Flower, Open Sans, Raleway,",
      h1: {
        fontFamily: "Indie Flower",
      },
      h2: {
        fontFamily: "Indie Flower",
      },
      h3: {
        fontFamily: "Indie Flower",
      },
      h4: {
        fontFamily: "Indie Flower",
      },
      h5: {
        fontFamily: "Indie Flower",
      },
      h6: {
        fontFamily: "Raleway",
      },
      body1: {
        fontFamily: "Raleway",
      },
      body2: {
        fontFamily: "Open Sans",
      },
      button: {
        fontFamily: "Open Sans",
      },
      mono: {
        fontFamily: "monospace",
        fontWeight: 400,
        letterSpacing: "0.12em",
        lineHeight: 2,
        fontSize: "1.2rem"
      },
    },
    palette: {
      primary: cyan,
      secondary: deepOrange,
      type: prefersDarkMode ? "dark" : "light",
    },
  })
  theme = responsiveFontSizes(theme)

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
