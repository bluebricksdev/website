import { createMuiTheme, darken, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { Shadows } from "@material-ui/core/styles/shadows";

const primary = "#27AEF7";

export const theme: Theme = {
  ...createMuiTheme({
    shadows: Array(25).fill("none") as Shadows,
    palette: {
      primary: {
        main: primary
      },
      secondary: {
        main: "#DB5C18"
      },
      error: {
        main: red.A400
      },
      background: {
        default: "#fff"
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    props: {
      MuiLink: {
        underline: "none"
      }
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            padding: "0 !important" // for storybook
          }
        }
      },
      MuiLink: {
        root: {
          "&:hover": {
            color: darken(primary, 0.3)
          }
        }
      }
    }
  })
};
