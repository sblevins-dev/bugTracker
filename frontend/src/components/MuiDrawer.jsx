import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../Controllers/Redux/authSlice";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { makeStyles } from "@material-ui/core/styles";
import { Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  icon: {
    color: "lightblue", 
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  hamWrapper: {
    position: "relative",
    color: "inherit",
    height: "50px",
  },
  ham: {
    position: "fixed",
    zIndex: "400",
    top: "10px",
    left: "-10px",
    padding: "0px",
    color: "white",
    width: "40px",
    height: "40px",
    marginLeft: "20px",
    transition: "all 0.4s ease-in-out",
    "&:hover": {
      color: "lightblue",
    },
  },
  linkContainer: {
    backgroundColor: "#232830",
    width: "150px",
    height: "100%",
    [theme.breakpoints.up('sm')]: {
      width: "200px"
    }
  },
  links: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'left',
    paddingTop: "20px",
    // [theme.breakpoints.up('sm')]: {
    //   alignItems: 'center' 
    // }
  },
  link: {
    textDecoration: "none",
    textTransform: "uppercase",
    paddingLeft: "10px",
    color: "white",
    height: "100%",
    transition: "all 0.4s ease-in-out",
    "&:hover": {
      color: "lightblue",
    },
  },
}));

export const MuiDrawer = () => {
  const [open, setOpen] = useState(false);

  const { admin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  const classes = useStyles();

  return (
    <>
      <IconButton
        size="inherit"
        edge="start"
        aria-label="logo"
        onClick={() => setOpen(true)}
        className={classes.hamWrapper}
      >
        <MenuIcon className={classes.ham} />
      </IconButton>
      <Drawer
        anchor="left"
        className={classes.drawer}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div
          style={{
            backgroundColor: "#1B1F28",
            height: "50px",
            padding: "30px 10px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <FontAwesomeIcon icon={faBug} className={classes.icon} />
          <h2 className={classes.title}>Bug Tracker</h2>
          <KeyboardArrowLeftIcon
            style={{ color: "lightblue", cursor: "pointer" }}
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider color="grey" />
        <Typography
          variant="h6"
          component="div"
          className={classes.linkContainer}
        >
          <Stack spacing={3} className={classes.links}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/createBug" className={classes.link}>
              Create
            </Link>
            {admin && <Link to="/requests">Requests</Link>}
            <Link to="/" className={classes.link} onClick={handleLogout}>
              Sign Out
            </Link>
          </Stack>
        </Typography>
      </Drawer>
    </>
  );
};
