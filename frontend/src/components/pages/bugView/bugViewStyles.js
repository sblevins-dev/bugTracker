import { makeStyles } from "@material-ui/core/styles";

export const bugViewStyles = makeStyles((theme) => ({
  bugContainer: {
    minHeight: "100vh",
    padding: "30px 50px",
    [theme.breakpoints.down("md")]: {
      padding: "40px 5px",
      paddingLeft: "5px",
    },
  },
  bugWrapper: {
    display: "flex",
    gap: "20px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
      padding: "0",
    },
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
    position: "relative",
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
    backgroundColor: "var(--secondary-color)",
    borderRadius: "5px",
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
    border: "0.5px solid rgb(64, 65, 65)",
    minWidth: "285px",
    // minWidth: "350px",
  },
  li: {
    display: "flex",
    justifyContent: "space-between",
    "&.span": {
      padding: "10px",
    },
  },
  h3: {
    borderRight: "0.5px solid rgb(64, 65, 65)",
    width: "100px",
    height: "100%",
    padding: "10px",
    fontWeight: "400",
  },
  span: {
    padding: "10px",
  },
  open: {
    backgroundColor: "#3B817D",
    padding: "2px 5px",
  },
  closed: {
    backgroundColor: "#D34E4B",
    padding: "2px 5px",
  },
  high: {
    backgroundColor: "#D34E4B",
    padding: "2px 5px",
  },
  medium: {
    backgroundColor: "#F9B780",
    color: "red",
    padding: "2px 5px",
  },
  low: {
    backgroundColor: "#F4DE88",
    color: "black",
    padding: "2px 5px",
  },
  btnGroup: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
}));
