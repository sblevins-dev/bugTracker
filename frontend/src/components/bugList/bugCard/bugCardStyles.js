import { makeStyles } from "@material-ui/core";

export const bugCardStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    cursor: "pointer",
    width: '100%',
    minHeight: "100px",
    maxHeight: "100px",
    overflow: 'hidden',
    margin: '0',
    "&:hover": {
      backgroundColor: "var(--fifth-color)",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
      padding: "10px 5px",
    },
  },
  header: {
    width: "25%",
    textAlign: 'center',
    color: "white",
    fontWeight: '400',
    fontSize: '1.2rem',
    overflow: 'hidden',
    maxHeight: '100%',
    padding: '5px',
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
  },
  p: {
    width: "25%",
    textAlign: "center",
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  statusP: {
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
  },
  status: {
    width: "25%",
    margin: "auto",
    padding: "5px",
    textAlign: "center",
    color: "white",
    borderRadius: "2px",
    minWidth: "60px",
    display: "block",
    [theme.breakpoints.down('md')]: {
      marginRight: '50px'
    }
  },
  badge: {
    top: "20px",
    right: "20px",
  },
  icon: {
    color: "white",
  },
}));