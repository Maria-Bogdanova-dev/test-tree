import { createTheme } from "@mui/material/styles";

const commonPadding = "16px";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      dark: "#303f9f",
    },
    warning: {
      main: "#f50057",
    },
  },

  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          width: "532px",
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: commonPadding,
          height: "32px",
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: commonPadding,
          overflow: "hidden",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          margin: "16px 0 8px 0",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.dark,
            },
          },
        }),
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: {
          height: "56px",
          padding: "8px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: "16px",
          minWidth: "90px",
          fontSize: "14px",
          height: "40px",
        },
      },
    },
  },
});

export default theme;
