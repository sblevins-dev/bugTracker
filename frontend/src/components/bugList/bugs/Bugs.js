import { BugCard } from "../bugCard/BugCard";
import Grid from "@mui/material/Grid";
import { bugStyles } from "./bugStyles";

export const Bugs = ({ bugs, dateFunction }) => {
  const classes = bugStyles();

  return (
    <div className={classes.bugWrapper}>
      <Grid
        container
        spacing={2}
        sx={{ margin: "0px" }}
        className={classes.header}
      >
        <Grid item className={classes.headerItem}>
          Title
        </Grid>
        <Grid item className={classes.headerItem}>
          Created
        </Grid>
        <Grid item className={classes.headerItem}>
          Creator
        </Grid>
        <Grid item className={classes.headerItem} sx={{ paddingRight: "35px" }}>
          Status
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{ margin: "0px" }}
        className={classes.header}
      >
        <Grid
          item
          className={classes.mobileHeaderItem}
          sx={{ marginLeft: "30px" }}
        >
          Title
        </Grid>
        <Grid
          item
          className={classes.mobileHeaderItem}
          sx={{ paddingRight: "30px" }}
        >
          Status
        </Grid>
      </Grid>
      <Grid container spacing={0} sx={{ margin: "0px" }}>
        {bugs && bugs[0] !== "nothing" ? (
          bugs.map((bug) => (
            <Grid
              item
              key={bug._id}
              sx={{ width: "100%", margin: "0 0 10px 0" }}
            >
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
