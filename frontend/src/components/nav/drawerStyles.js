import { makeStyles } from "@material-ui/core/styles";

export const drawerStyles = makeStyles((theme) => ({
    drawer: {
      width: '100px',
      height: '50px',
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    icon: {
      color: "lightblue",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    hamWrapper: {
      position: "absolute",
      color: "inherit",
      maxHeight: '50px',
      
      top: "10px",
      left: "20px",
    },
    ham: {
      zIndex: "400",
      color: "white",
      padding: '0',
      transition: "all 0.4s ease-in-out",
      "&:hover": {
        color: "lightblue",
      },
      [theme.breakpoints.down('sm')]: {
        color: 'var(--fourth-color)'
      }
    },
    linkContainer: {
      backgroundColor: "#232830",
      width: "150px",
      height: "100%",
      borderRight: '.5px solid var(--primary-color)',
      [theme.breakpoints.up("sm")]: {
        width: "170px",
      },
    },
    links: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      paddingTop: "20px",
      width: '100%',
      fontWeight: '400',
    },
    link: {
      textDecoration: "none",
      textTransform: "uppercase",
      paddingLeft: "10px",
      color: "white",
      height: "100%",
      width: "100%",
      textAlign: "left",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.4s ease-in-out",
      "&:hover": {
        color: "lightblue",
      },
    },
  }));