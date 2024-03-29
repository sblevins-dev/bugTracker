import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@mui/material/Checkbox";
import { MenuItem } from "@mui/material";
import { InputAdornment } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Collapse from "@mui/material/Collapse";
import { bugUpdateStyles } from "./bugUpdateStyles";

export const BugUpdate = ({
  bug,
  formInput,
  setFormInput,
}) => {
  const handleFormInput = (e) => {
    // console.log(formInput.steps)
    if (e.target.name.split(" ").includes("step")) {
      // console.log(filteredSteps)
      setFormInput({
        ...formInput,
        steps: {
          ...formInput.steps,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setFormInput({
        ...formInput,
        [e.target.name]: e.target.value,
      });
    }
  };

  const classes = bugUpdateStyles();

  const [updateOpen, setUpdateOpen] = useState(false);

  // delete step
  const deleteStep = (key) => {
    let newSteps = Object.entries(formInput.steps).filter(
      (step, i) => step[0] !== key
    );
    let obj = {};
    newSteps.forEach((step, i) => {
      obj[`step ${i + 1}`] = step[1];
    });
    setFormInput({
      ...formInput,
      steps: obj,
    });
    console.log(formInput.steps);
  };

  const handleChecked = (e) => {
    let isChecked = e.target.checked;
    let open = "open";
    let closed = "closed";
    let tempStatus = bug.status;

    const checkStatus = () => {
      tempStatus === open && isChecked
        ? (tempStatus = closed)
        : tempStatus === open && !isChecked
        ? (tempStatus = open)
        : tempStatus === closed && isChecked
        ? (tempStatus = open)
        : (tempStatus = closed);

      return tempStatus;
    };

    setFormInput({
      ...formInput,
      status: checkStatus(),
    });
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "var(--third-color)",
        padding: "20px",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          paddingBottom: "10px",
          borderBottom: "0.5px solid rgb(64, 65, 65)",
          fontWeight: "400",
        }}
      >
        Update
      </h2>
      {updateOpen ? (
        <ArrowDropUpIcon
          className={classes.arrow}
          fontSize="large"
          onClick={() => setUpdateOpen(!updateOpen)}
        />
      ) : (
        <ArrowDropDownIcon
          className={classes.arrow}
          fontSize="large"
          onClick={() => setUpdateOpen(!updateOpen)}
        />
      )}
      <Collapse
        in={updateOpen}
        variant="vertical"
        className={classes.updateWrapper}
      >
        <TextField
          id="nameInput"
          className={classes.inputs}
          name="name"
          sx={{ sm: 300, md: 400, flex: "2", marginBottom: "20px" }}
          variant="filled"
          label="Title"
          type="text"
          fullWidth
          value={formInput.name}
          onChange={handleFormInput}
        />
        <div className={classes.markWrapper} style={{ marginRight: "0" }}>
          {bug.status === "closed" ? (
            <label>Re-Open Ticket</label>
          ) : (
            <label>Mark Complete</label>
          )}

          <Checkbox sx={{ color: "white" }} onChange={handleChecked} />
        </div>
        <FormControl className={classes.priorityWrapper}>
          <label>Priority</label>
          <Select
            name="priority"
            className={classes.dropDown}
            value={formInput.priority}
            onChange={handleFormInput}
            sx={
              formInput.priority === "high"
                ? { backgroundColor: "red" }
                : formInput.priority === "medium"
                ? { backgroundColor: "orange" }
                : { backgroundColor: "yellow" }
            }
          >
            <MenuItem key="low" value="low">
              Low
            </MenuItem>
            <MenuItem key="medium" value="medium">
              Mid
            </MenuItem>
            <MenuItem key="high" value="high">
              High
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="detailsInput"
          className={classes.inputs}
          name="details"
          sx={{ flex: "12" }}
          variant="filled"
          label="Information"
          type="text"
          value={formInput.details}
          onChange={handleFormInput}
          multiline
          fullWidth
        />
        <Box sx={{ width: "100%", alignItems: "flex-start" }}>
          <h2
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              paddingBottom: "10px",
              borderBottom: "0.5px solid rgb(64, 65, 65)",
              fontWeight: "400",
              textAlign: "left",
            }}
          >
            Logs
          </h2>
          {Object.keys(formInput.steps).map((step, i) => (
            <TextField
              id="stepsInput"
              key={i}
              className={classes.steps}
              name={step}
              variant="filled"
              type="text"
              value={formInput.steps[step]}
              onChange={handleFormInput}
              fullWidth
              multiline
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <DeleteIcon
                      color="error"
                      sx={{ cursor: "pointer", marginBottom: "20px" }}
                      fontSize="small"
                      onClick={(e) => deleteStep(step)}
                    />
                  </InputAdornment>
                ),
              }}
            />
          ))}
        </Box>
      </Collapse>
    </div>
  );
};
