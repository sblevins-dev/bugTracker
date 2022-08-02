import "../css/bugs.css";
import { BugCard } from "./BugCard";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bugWrapper: {
    width: '100%',
    minHeight: '525px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '1500px',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '70%'
    }
  },
  header: {
    marginBottom: "20px",
    padding: "20px 20px 0px",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 40px",
      marginBottom: "10px"
    },
  },
  mobileHeaderItem: {
    textAlign: "center",
    fontSize: "2rem",
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
    fontSize: "2rem",
    color: "white",
    display: "none",
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export const Bugs = ({ bugs, dateFunction }) => {
  const classes = useStyles();

  return (
    <div className={classes.bugWrapper}>
      <Grid container spacing={2} className={classes.header}>
        <div className={classes.headerItem}>Title</div>
        <div className={classes.headerItem}>Created</div>
        <div className={classes.headerItem}>Creator</div>
        <div className={classes.headerItem}>Status</div>
      </Grid>
      <Grid container spacing={2} className={classes.header}>
        <div className={classes.mobileHeaderItem}>Title</div>
        <div className={classes.mobileHeaderItem}>Status</div>
      </Grid>
      <Grid container spacing={2}>
        {bugs && bugs[0] !== "nothing" ? (
          bugs.map((bug) => (
            <BugCard key={bug._id} bug={bug} dateFunction={dateFunction} />
          ))
        ) : (
          <div className="no-bugs">No Bugs Found</div>
        )}
      </Grid>
    </div>
  );
};
