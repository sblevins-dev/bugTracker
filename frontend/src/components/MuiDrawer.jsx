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

const useStyles = makeStyles({
  drawer: {
    // width: "250px",
    // backgroundColor: "black"
  },
  iconWrapper: {
    position: "relative",
    color: "inherit",
    height: "50px",
  },
  icon: {
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
        color: "lightblue"
    }
  },
  linkContainer: {
    backgroundColor: "#232830",
    width: "250px",
    height: "100%",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
  },
  link: {
    textDecoration: "none",
    textTransform: "uppercase",
    paddingLeft: "10px",
    color: "white",
    height: "100%",
    transition: "all 0.4s ease-in-out",
    "&:hover": {
    //   backgroundColor: "white",
      color: "lightblue",
    },
  },
});

export const MuiDrawer = () => {
  const [open, setOpen] = useState(false);

    const { admin } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(signOut())
    }

  const classes = useStyles();

  // const handleDrawerToggle = () => {
  //     setMobileOpen(!mobileOpen)
  // }

  // const drawer = (
  //     <div>
  //         <Toolbar />
  //         <Divider />

  //     </div>
  // )

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <IconButton
        size="inherit"
        edge="start"
        aria-label="logo"
        onClick={() => setOpen(true)}
        className={classes.iconWrapper}
      >
        <MenuIcon className={classes.icon} />
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
            padding: "30px 0",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            color: "white",
          }}
        >
          <FontAwesomeIcon icon={faBug} style={{ color: "lightblue" }} />
          <h2>Bug Tracker</h2>
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
              Create Bug
            </Link>
            {admin && <Link to="/requests">Requests</Link>}
            <Link to="/" className={classes.link} onClick={handleLogout} >Sign Out</Link>
          </Stack>
        </Typography>
        {/* <Box p={2} width="250px" BackdropProps={{ invisible: true }} height="100%" textAlign="center" role="presentation" className={classes.linkContainer}>
          Side panel
        </Box> */}
      </Drawer>
    </>
  );
};
