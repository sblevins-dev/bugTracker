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
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../../Controllers/Redux/bugSlice";
import { fetchBugs, leaveComment } from "../../../Controllers/Redux/bugSlice";
import { toast } from "react-toastify";
import { BugUpdate } from "../../bugList/bugUpdate/BugUpdate";
import { bugViewStyles } from "./bugViewStyles";

export const BugView = ({ user }) => {
  const classes = bugViewStyles();

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
  const [stepsOpen, setStepsOpen] = useState(false);

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
      let temp = !clicked;
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
  }, [clicked, dispatch]);

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

  const setSteps = () => {
    let obj = {};
    bug.steps.map((step, i) => (obj[`step ${i + 1}`] = step));

    return obj;
  };

  const initialState = {
    id: bug._id,
    name: bug.name,
    author: bug.author,
    assigned: bug.assigned,
    reason: "edit",
    steps: setSteps(),
    details: bug.details,
    status: bug.status,
    priority:
      bug.priority !== "" && bug.priority !== undefined ? bug.priority : "low",
  };

  const [formInput, setFormInput] = useState(initialState);

  const updateFunction = async () => {
    const { name, reason, steps, details, status, priority } = formInput;

    if (!user) {
      toast.error("Oops, something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (
      name === "" ||
      status === "" ||
      details === "" ||
      priority === "" ||
      reason === "" ||
      steps === ""
    ) {
      toast.error("Please enter bug information", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (Object.values(steps).includes("")) {
      toast.error("Please add or remove empty step", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (formInput === initialState) {
      toast.warning("Nothing to update!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      await dispatch(sendRequest(formInput));
      await navigate("/");
    }
  };

  return (
    <Container className={classes.bugContainer} disableGutters>
      <Box className={classes.bugWrapper}>
        <Box className={classes.leftSide}>
          <h1
            style={{
              backgroundColor: "var(--third-color)",
              padding: "20px",
              borderRadius: "5px",
              fontWeight: "400",
            }}
          >
            {name}
          </h1>

          <div className={classes.detail}>
            <h2
              style={{
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "0.5px solid rgb(64, 65, 65)",
                fontWeight: "400",
              }}
            >
              Information
            </h2>
            <p>{details}</p>
          </div>

          {steps.length > 0 && (
            <div className={classes.stepsContainer}>
              <h2
                style={{
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "0.5px solid rgb(64, 65, 65)",
                  fontWeight: "400",
                }}
              >
                Steps Performed
              </h2>
              {stepsOpen ? (
                <ArrowDropUpIcon
                  className={classes.arrow}
                  fontSize="large"
                  onClick={() => setStepsOpen(!stepsOpen)}
                />
              ) : (
                <ArrowDropDownIcon
                  className={classes.arrow}
                  fontSize="large"
                  onClick={() => setStepsOpen(!stepsOpen)}
                />
              )}
              {!stepsOpen ? (
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    textAlign: "right",
                    paddingRight: "10px",
                  }}
                >
                  {steps.length} steps collapsed
                </p>
              ) : (
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    textAlign: "right",
                    paddingRight: "10px",
                    height: "14px",
                  }}
                ></p>
              )}
              <Collapse in={stepsOpen} variant="vertical">
                <ul className={classes.stepsWrapper}>
                  {steps.map((step, i) => (
                    <li
                      key={i}
                      style={{
                        padding: "10px 0 10px",
                        width: "100%",
                        wordWrap: "break-word",
                      }}
                    >
                      {i + 1}. {step}
                    </li>
                  ))}
                </ul>
              </Collapse>
            </div>
          )}

          <BugUpdate
            bug={bug}
            user={user}
            initialState={initialState}
            formInput={formInput}
            setFormInput={setFormInput}
            updateFunction={updateFunction}
          />
          <List className={classes.commentList} sx={{ padding: "20px" }}>
            <h2
              style={{
                width: "100%",
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "0.5px solid rgb(64, 65, 65)",
                fontWeight: "400",
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
            {!open ? (
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  textAlign: "right",
                  paddingRight: "10px",
                }}
              >
                {comments.length} comments collpsed
              </p>
            ) : (
              <p style={{ height: "14px" }}></p>
            )}
            <Collapse in={open} orientation="vertical">
              {comments.map((comment, i) => (
                <>
                  <ListItem
                    key={i}
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
                  <Divider sx={{ bgcolor: "rgb(64, 65, 65)" }} />
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
              borderBottom: "0.5px solid rgb(64, 65, 65)",
              fontWeight: "400",
            }}
          >
            Bug Details
          </h2>
          <ul className={classes.bugDetailsWrapper}>
            <li className={classes.li}>
              <h3 className={classes.h3}>Creator</h3>
              <span style={{ textAlign: "right", padding: "10px" }}>
                {author}
              </span>
            </li>
            <li className={classes.li}>
              <h3 className={classes.h3}>Assignee</h3>
              <span style={{ textAlign: "right", padding: "10px" }}>
                {assigned}
              </span>
            </li>
            <li className={classes.li}>
              <h3 className={classes.h3}>Status</h3>
              <span
                className={status === "open" ? classes.open : classes.closed}
                style={{ margin: "10px" }}
              >
                {status}
              </span>
            </li>
            <li className={classes.li}>
              <h3 className={classes.h3}>Priority</h3>
              <span
                className={
                  priority === "high"
                    ? classes.high
                    : priority === "medium"
                    ? classes.medium
                    : classes.low
                }
                style={{ margin: "10px" }}
              >
                {priority}
              </span>
            </li>
            <li className={classes.li}>
              <h3 className={classes.h3}>Created</h3>
              <span className={classes.span}>
                {createdAt && createdAt !== undefined && formatDate(createdAt)}
              </span>
            </li>
            <li className={classes.li}>
              <h3 className={classes.h3}>Updated</h3>
              <span className={classes.span}>
                {updatedAt && updatedAt !== undefined && formatDate(updatedAt)}
              </span>
            </li>
          </ul>
          <div className={classes.btnGroup}>
            <Button variant="contained" onClick={updateFunction}>
              Update Bug
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Back
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
};
