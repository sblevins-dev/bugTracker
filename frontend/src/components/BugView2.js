import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBugs, leaveComment } from "../Controllers/Redux/bugSlice";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  bugContainer: {
    minHeight: "100vh",
    padding: "30px 50px",
  },
  bugWrapper: {
    display: "flex",
    margin: "10px",
    gap: "20px",
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
    }
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
    position: "relative",
  },
  arrow: {
    position: "absolute",
    top: "20px",
    right: "25px",
    cursor: "pointer",
  },
  commentInput: {
    color: "white",
    backgroundColor: "var(--secondary-color)",
    borderRadius: "5px",
  },
  inputColor: {
    color: "white",
  },
  commentBtn: {
    paddingTop: "30px",
  },
  rightSide: {
    padding: "20px",
    flex: 1,
    backgroundColor: "var(--third-color)",
    color: "white",
    borderRadius: "5px",
    height: "max-content",
  },
  bugDetailsWrapper: {
    listStyle: "none",
    // minWidth: "350px",
  },
  li: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    border: "0.5px solid white",
  },
  h3: {
    borderRight: "0.5px solid white",
    width: "100px",
    height: "100%",
  },
  open: {
    backgroundColor: "#3B817D",
    padding: '2px 5px',
  },
  closed: {
    backgroundColor: "#D34E4B",
    padding: '2px 5px',
  },
  high: {
    backgroundColor: "#D34E4B",
    padding: '2px 5px'
  },
  mid: {
    backgroundColor: "#F9B780",
    color: 'red',
    padding: '2px 5px'
  },
  low: {
    backgroundColor: "#F4DE88",
    color: 'black',
    padding: '2px 5px'
  },
  btnGroup: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
}));

const BugView2 = ({ user }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const location = useLocation();
  const { bug } = location.state;

  const navigate = useNavigate();

  // go to home if not logged in
  const { auth } = useSelector((state) => state);

  if (!auth.loggedIn) {
    navigate("/");
  }

  // Used to fetch bugs after a comment is added
  const [clicked, setClicked] = useState(false);

  const [open, setOpen] = useState(false);

  // Set comment to leave
  const [comment, setComment] = useState("");

  // Onchange to set comment
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  // Handle submit of comment
  const submitComment = async (e) => {
    e.preventDefault();

    let obj;

    if (comment && user && bug) {
      obj = {
        user,
        comment,
        id: bug._id,
      };
    }

    if (comment !== "") {
        let temp = !clicked
      dispatch(leaveComment(obj))
        .then(() => setClicked(temp))
        .then(() => setComment(""));
    } else {
      toast.warn("Please enter text", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  // Fetch bugs after comment is sent for the bug to re-render
  useEffect(() => {
    dispatch(fetchBugs());
  }, [clicked]);

  // format date
  const formatDate = (dateToFormat) => {
    let temp = dateToFormat.split("T");

    let reverseTemp = temp[0].split("-");

    return reverseTemp[1] + "-" + reverseTemp[2] + "-" + reverseTemp[0];
  };

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

  const handleClick = () => {
    navigate("/");
  };

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
          <List className={classes.commentList} sx={{ padding: "20px" }}>
            <h2
              style={{
                width: "100%",
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "0.5px solid white",
              }}
            >
              Comments
            </h2>
            <TextField
              id="filled-basic"
              label="Type Here"
              variant="filled"
              value={comment}
              className={classes.commentInput}
              multiline
              fullWidth
              onChange={handleComment}
            />
            <Button
              variant="contained"
              sx={{ marginTop: "20px", marginBottom: "20px" }}
              onClick={submitComment}
            >
              Submit
            </Button>
            {open ? (
              <ArrowDropUpIcon
                className={classes.arrow}
                fontSize="large"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <ArrowDropDownIcon
                className={classes.arrow}
                fontSize="large"
                onClick={() => setOpen(!open)}
              />
            )}
            <Collapse in={open} orientation="vertical">
              {comments.map((comment) => (
                <>
                  <ListItem
                    key={bug._id}
                    sx={{ width: "100%", marginBottom: "50px", padding: "0px" }}
                  >
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
            </Collapse>
          </List>
        </Box>
        <Box className={classes.rightSide}>
          <h2
            style={{
              marginBottom: "20px",
              paddingBottom: "10px",
              borderBottom: "0.5px solid white",
            }}
          >
            Bug Details
          </h2>
          <ul className={classes.bugDetailsWrapper}>
            <li className={classes.li}>
              <h3 className={classes.h3}>Creator</h3>
              <span style={{textAlign: 'right'}}>{author}</span>
            </li>
            <li className={classes.li}>
              <h3 className={classes.h3}>Assignee</h3>
              <span style={{textAlign: 'right'}}>{assigned}</span>
            </li>
            <li className={classes.li}>
              <h3 className={classes.h3}>Status</h3>
              <span className={status === 'open' ? classes.open : classes.closed}>{status}</span>
            </li>
            <li className={classes.li}>
              <h3 className={classes.h3}>Priority</h3>
              <span className={priority === 'high' ? classes.high : priority === 'medium' ? classes.mid : classes.low}>{priority}</span>
            </li>
            <li className={classes.li}>
              <h3 className={classes.h3}>Created</h3>
              <span>
                {createdAt && createdAt !== undefined && formatDate(createdAt)}
              </span>
            </li>
            <li className={classes.li}>
              <h3 className={classes.h3}>Updated</h3>
              <span>
                {updatedAt && updatedAt !== undefined && formatDate(updatedAt)}
              </span>
            </li>
          </ul>
          <div className={classes.btnGroup}>
            <Button variant="contained">Update Bug</Button>
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Back
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default BugView2;
