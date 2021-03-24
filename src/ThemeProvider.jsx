import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles"

import React from "react"
import { deepOrange } from "@material-ui/core/colors"

export const ThemeProvider = ({ children }) => {
  let theme = createMuiTheme({
    typography: {
      fontFamily: "Archivo Black, Open Sans, Raleway,",
      h1: {
        fontFamily: "Archivo Black",
      },
      h2: {
        fontFamily: "Archivo Black",
      },
      h3: {
        fontFamily: "Archivo Black",
      },
      h4: {
        fontFamily: "Archivo",
      },
      h5: {
        fontFamily: "Archivo Narrow",
      },
      h6: {
        fontFamily: "Archivo Narrow",
      },
      body1: {
        fontFamily: "Raleway",
      },
      body2: {
        fontFamily: "Open Sans",
      },
      button: {
        fontFamily: "Archivo",
      },
      mono: {
        fontFamily: "monospace",
        fontWeight: 400,
        letterSpacing: "0.12em",
        lineHeight: 2,
        fontSize: "1.2rem",
      },
    },
    palette: {
      primary: {
        main: "#2464B9",
      },
      secondary: deepOrange,
      type: "light",
    },
  })
  theme = responsiveFontSizes(theme)

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
