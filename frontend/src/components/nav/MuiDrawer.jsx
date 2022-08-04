import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../Controllers/Redux/authSlice";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddTaskIcon from "@mui/icons-material/AddTask";
import LogoutIcon from "@mui/icons-material/Logout";
import { Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { drawerStyles } from "./drawerStyles";

export const MuiDrawer = () => {
  const [open, setOpen] = useState(false);

  const { admin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  const classes = drawerStyles();

  const handleClick = () => {
    setOpen(false)
  }

  return (
    <div style={{position: 'absolute', height: '50px'}}>
      <IconButton
        size="inherit"
        edge="start"
        aria-label="logo"
        onClick={() => setOpen(true)}
        className={classes.hamWrapper}
        sx={{padding: '0'}}
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
            padding: "10px 10px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
            borderRight: '.5px solid var(--primary-color)'
          }}
        >
          <FontAwesomeIcon icon={faBug} className={classes.icon} />
          <h2 className={classes.title}>Zapper</h2>
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
            <Link to="/" className={classes.link} onClick={handleClick}>
              <HomeIcon sx={{width: '25px'}} />
              <p style={{width: '100px'}}>Home</p>
            </Link>
            <Link to="/createBug" className={classes.link} style={{margin: '0'}} onClick={handleClick}>
              <AddBoxIcon sx={{width: '25px'}} />
              <p style={{width: '100px'}}>Create</p>
            </Link>
            {admin && (
              <Link to="/requests" className={classes.link} style={{margin: '0'}} onClick={handleClick}>
                <AddTaskIcon sx={{width: '25px'}} />
                <p style={{width: '100px'}}>Requests</p>
              </Link>
            )}
            <Link to="/" className={classes.link} style={{margin: '0'}} onClick={handleLogout}>
              <LogoutIcon sx={{width: '25px'}} />
              <p style={{width: '100px'}}>Sign Out</p>
            </Link>
          </Stack>
        </Typography>
      </Drawer>
    </div>
  );
};
