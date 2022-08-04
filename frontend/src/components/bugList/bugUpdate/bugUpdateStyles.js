import { makeStyles } from "@material-ui/core/styles";

export const bugUpdateStyles = makeStyles((theme) => ({
  updateWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    gap: "20px",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      alignItems: "left",
    },
  },
  arrow: {
    position: "absolute",
    top: "20px",
    right: "25px",
    cursor: "pointer",
  },
  inputs: {
    backgroundColor: "var(--secondary-color)",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  markWrapper: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flex: 2,
    width: "325px",
    margin: "0",
    marginTop: "20px",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: "325px",
    },
  },
  priorityWrapper: {
    width: "325px",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    gap: "20px",
    flex: "2",
    maxWidth: "450px",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      maxWidth: "500px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "400px",
    },
  },
  dropDown: {
    backgroundColor: "var(--secondary-color)",
    borderRadius: "5px",
    paddingLeft: "5px",
    flex: "1",
    marginBottom: "10px",
    maxWidth: "150px",
  },
  steps: {
    backgroundColor: "var(--secondary-color)",
    borderRadius: "5px",
    marginBottom: "20px",
  },
}));
