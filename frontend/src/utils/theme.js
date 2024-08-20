import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      post: "#eefff3",
      headingTitle: "-webkit-linear-gradient(#ec4899, #fb7185)",
    },
    text: {
      username: "#00a89d",
    },
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          paddingY: theme.spacing(1),
          [theme.breakpoints.up("md")]: {
            paddingTop: theme.spacing(2),
          },
        }),
      },
    },
    Card: {
      defaultProps: {
        raised: true,
      },
    },
  },
});

export default theme;
