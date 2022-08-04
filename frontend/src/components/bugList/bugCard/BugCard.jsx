import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import CommentIcon from "@mui/icons-material/Comment";
import Badge from "@mui/material/Badge";
import { bugCardStyles } from "./bugCardStyles";

export const BugCard = ({ bug, dateFunction }) => {
  const { name, author, createdAt, status, comments } = bug;

  const classes = bugCardStyles();

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate("/bugView", {
      state: {
        bug: bug,
      },
    });
  };

  return (
    <Paper
      className={classes.card}
      sx={{
        backgroundColor: "var(--third-color)",
        transition: "all 0.3s ease-in-out",
      }}
      onClick={handleViewClick}
    >
      <h2 className={classes.header}>{name}</h2>
      <p className={classes.p}>{dateFunction(createdAt)}</p>
      <p className={classes.p}>{author}</p>
      <div className={classes.statusP}>
        <div
          className={classes.status}
          style={
            status === "open"
              ? { backgroundColor: "#3B817D" }
              : { backgroundColor: "#D34E4B" }
          }
        >
          {status}
        </div>
      </div>
      <Badge
        badgeContent={comments.length}
        className={classes.badge}
        color="warning"
        sx={{ position: "absolute" }}
      >
        <CommentIcon className={classes.icon} fontSize="small" />
      </Badge>
    </Paper>
  );
};
