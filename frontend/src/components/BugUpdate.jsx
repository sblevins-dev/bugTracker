import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@mui/material";
import { toast } from "react-toastify";


const useStyles = makeStyles(theme => ({
    updateWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        gap: '20px',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            alignItems: 'left'
        },
        textAlign: 'center'
    },
    inputs: {
        backgroundColor: "var(--secondary-color)",
        borderRadius: '5px',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    markWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flex: '2',
        maxWidth: '200px',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'space-between',
        }
    },
    priorityWrapper: {
        width: '200px',
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        maxWidth: '450px',
        [theme.breakpoints.up('md')]: {
            maxWidth: '500px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            maxWidth: '400px'
        },
    },
    dropDown: {
        backgroundColor: "var(--secondary-color)",
        borderRadius: '5px',
        paddingLeft: '5px',
        flex: '1',
        marginBottom: '10px',
        maxWidth: '150px'
    }
}))

export const BugUpdate = ({bug, user}) => {

    console.log(bug.steps)

    const initialState = {
        name: "",
        reason: 'edit',
        steps: bug.steps,
        details: "",
        status: bug.status,
        priority: bug.priority,
    }

    const [formInput, setFormInput] = useState(initialState)

    const handleFormInput = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        })
    }

    const classes = useStyles();

    const handleUpdate = async (e) => {

        if (!user) {
            toast.error("Oops, something went wrong!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else if (
            name === "" ||
            assigned === "" ||
            author === "" ||
            status === "" ||
            details === ""
          ) {
            toast.error("Please enter bug information", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else if (assigned === "--Select a User--") {
            toast.error("Please assign to a user", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else if (Object.values(steps).includes("")) {
            toast.error("Please add or remove empty step", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else if (formData === initialState) {
            toast.warning("Nothing to update!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else {
            await dispatch(sendRequest(formData));
            await navigate("/");
          }
    }

    
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "var(--third-color)",
        padding: "20px",
        borderRadius: "5px",
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
      <div className={classes.updateWrapper}>
        <TextField id="nameInput" className={classes.inputs} name="name" sx={{ sm: 300, md: 400}} variant="filled" label="Title" type="text" value={formInput.title} onChange={handleFormInput} />
        <div className={classes.markWrapper}>
            <label>Mark Complete</label>
        <Checkbox sx={{ color: 'white'}} />
        </div>
        <FormControl className={classes.priorityWrapper}>
            <label>Priority</label>
            <Select name="priority" className={classes.dropDown} value={formInput.priority} onChange={handleFormInput} sx={formInput.priority === 'high' ? {backgroundColor: 'red'} : formInput.priority === 'mid' ? {backgroundColor: 'orange'} : {backgroundColor: 'yellow'}}>
                <MenuItem key="low" value="low">Low</MenuItem>
                <MenuItem key="mid" value="mid">Medium</MenuItem>
                <MenuItem key="high" value="high">High</MenuItem>
            </Select>
        </FormControl>
        <TextField id="detailsInput" className={classes.inputs} name="details" sx={{ flex: '12' }} variant="filled" label="Information" type="text" value={formInput.details} onChange={handleFormInput} multiline fullWidth/>
      </div>
    </div>
  );
};
