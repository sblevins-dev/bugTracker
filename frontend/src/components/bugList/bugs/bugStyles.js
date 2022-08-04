import { makeStyles } from "@material-ui/core/styles";

export const bugStyles = makeStyles((theme) => ({
  bugWrapper: {
    maxWidth: "100vw",
    minHeight: "525px",
    marginLeft: "0px",
    [theme.breakpoints.up("md")]: {
      maxWidth: "1500px",
    },
    [theme.breakpoints.down("md")]: {
      minWidth: "70%",
    },
  },
  header: {
    maxWidth: "100%",
    marginBottom: "20px",
    padding: "10px",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
  },
  mobileHeaderItem: {
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  headerItem: {
    width: "25%",
    textAlign: "center",
    color: "white",
    display: "none",
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));