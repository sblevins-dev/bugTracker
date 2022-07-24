import { useState } from "react";
import Appbar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles";
import { styled } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  drawer: {
    // width: "160px",
  },
  iconWrapper: {
    position: "relative",
    color: "inherit",
    height: "50px",
  },
  icon: {
    position: "fixed",
    top: "10px",
    left: "-10px",
    height: "100px",
    padding: "0px",
    color: "white",
    backgroundColor: "#232830",
    width: "50px",
    height: "50px",
    marginLeft: "20px"
  },
  linkContainer: {
    // backdropFilter: "blur(10px)"
    // background: "rgba(35,40,48, 0.5)",
    background: "rgba(35,40,48, 0.5)"
  }
});

const Menu = styled("div")(({theme}) => ({
    backgroundColor: "#232830",
    width: "250px",
    height: "100%"
}))

const drawerWidth = 240;

export const MuiDrawer = () => {
  const [open, setOpen] = useState(false);

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
        <div style={{ backgroundColor: "#1B1F28", height: "50px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "space-evenly", color: "white"}}>
            <FontAwesomeIcon icon={faBug} style={{ color: "lightblue" }} />
            <h2>Bug Tracker</h2>
            <KeyboardArrowLeftIcon style={{ color: "lightblue", cursor: "pointer" }} onClick={() => setOpen(false)} />
        </div>
        <Divider color="grey" />
        <Menu>
            Side Panel
        </Menu>
        {/* <Box p={2} width="250px" BackdropProps={{ invisible: true }} height="100%" textAlign="center" role="presentation" className={classes.linkContainer}>
          Side panel
        </Box> */}
      </Drawer>
    </>
  );
};
