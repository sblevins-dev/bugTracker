import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  bugContainer: {
    minHeight: "100vh",
    padding: "20px 50px",
  },
  bugWrapper: {
    display: "flex",
    margin: "10px",
    gap: "20px",
  },
  leftSide: {
    flex: 2,
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  stepsContainer: {
    backgroundColor: "var(--third-color)",
    padding: "20px",
    borderRadius: "5px",
  },
  stepsWrapper: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  detail: {
    backgroundColor: "var(--third-color)",
    padding: "20px",
    borderRadius: "5px",
  },
  commentList: {
    backgroundColor: "var(--third-color)",
    padding: "20px",
    borderRadius: "5px",
    maxWidth: "750px",
  },
  rightSide: {
    flex: 1,
    backgroundColor: "var(--third-color)",
    color: "white",
    borderRadius: "5px",
    maxHeight: "500px",
  },
  bugDetailsWrapper: {
    listStyle: "none",
    padding: "20px",
    minWidth: "350px",
  },
  li: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    border: "0.5px solid white",
  },
}));

const BugView2 = () => {
  const classes = useStyles();

  const location = useLocation();
  const { bug } = location.state;

  const {
    assigned,
    author,
    comments,
    createdAt,
    details,
    name,
    priority,
    status,
    steps,
    updatedAt,
  } = bug;
  console.log(bug);

  return (
    <Container className={classes.bugContainer}>
      <Box className={classes.bugWrapper}>
        <Box className={classes.leftSide}>
          <h1
            style={{
              backgroundColor: "var(--third-color)",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            {name}
          </h1>
          <div className={classes.stepsContainer}>
            <h2
              style={{
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "0.5px solid white",
              }}
            >
              Steps Performed
            </h2>
            <ul className={classes.stepsWrapper}>
              {steps.map((step, i) => (
                <li>
                  {i + 1}. {step}
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.detail}>
            <h2
              style={{
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "0.5px solid white",
              }}
            >
              Information
            </h2>
            <p>{details}</p>
          </div>
          <List className={classes.commentList} sx={{ padding: '20px'}}>
            <h2
              style={{
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "0.5px solid white",
              }}
            >
              Comments
            </h2>
            {comments.map((comment) => (
              <>
                <ListItem sx={{ width: "100%", marginTop: "50px", padding: '0px' }}>
                  <ListItemText
                    primary={comment[0]}
                    secondary={
                      <Typography
                        sx={{
                          display: "inline",
                          wordWrap: "break-word",
                          width: "100%",
                        }}
                        component="span"
                        variant="body2"
                      >
                        {comment[1]}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Box>
        <Box className={classes.rightSide}>
          <h2 style={{ padding: "20px" }}>Bug Details</h2>
          <hr style={{ border: "0.5px solid var(--secondary-color)" }} />
          <ul className={classes.bugDetailsWrapper}>
            <li className={classes.li}>
              <h3>Creator</h3>
              <span>{author}</span>
            </li>
            <li className={classes.li}>
              <h3>Assignee:</h3>
              <span>{assigned}</span>
            </li>
            <li className={classes.li}>
              <h3>Status:</h3>
              <span>{status}</span>
            </li>
            <li className={classes.li}>
              <h3>Priority:</h3>
              <span>{priority}</span>
            </li>
            <li className={classes.li}>
              <h3>Created:</h3>
              <span>{createdAt}</span>
            </li>
            <li className={classes.li}>
              <h3>Updated:</h3>
              <span>{updatedAt}</span>
            </li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default BugView2;
