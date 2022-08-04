import "../css/bugs.css";
import { BugCard } from "./BugCard";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bugWrapper: {
    maxWidth: '100vw',
    minHeight: '525px',
    marginLeft: '0px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '1500px',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '70%'
    }
  },
  header: {
    maxWidth: '100%',
    marginBottom: "20px",
    padding: "10px",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px"
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

export const Bugs = ({ bugs, dateFunction }) => {
  const classes = useStyles();

  return (
    <div className={classes.bugWrapper}>
      <Grid container spacing={2} sx={{margin: '0px'}} className={classes.header}>
        <Grid item className={classes.headerItem}>Title</Grid>
        <Grid item className={classes.headerItem}>Created</Grid>
        <Grid item className={classes.headerItem}>Creator</Grid>
        <Grid item className={classes.headerItem} sx={{paddingRight: '35px'}}>Status</Grid>
      </Grid>
      <Grid container spacing={2} sx={{margin: '0px'}} className={classes.header}>
        <Grid item className={classes.mobileHeaderItem} sx={{marginLeft: '30px'}}>Title</Grid>
        <Grid item className={classes.mobileHeaderItem} sx={{paddingRight: '30px'}}>Status</Grid>
        
      </Grid>
      <Grid container spacing={0} sx={{margin: '0px'}}>
        {bugs && bugs[0] !== "nothing" ? (
          bugs.map((bug) => (
            <Grid item key={bug._id} sx={{width: '100%', margin: '0 0 10px 0'}}>
              <BugCard bug={bug} dateFunction={dateFunction} />
            </Grid>
            
          ))
        ) : (
          <div className="no-bugs">No Bugs Found</div>
        )}
      </Grid>
    </div>
  );
};
