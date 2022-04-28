import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../css/requests.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { editBug, postBug } from "../Controllers/Redux/bugSlice";
import { toast } from "react-toastify";

export const Requests = () => {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  if (!admin) {
    navigate("/");
  }

  const getRequests = async () => {
    let response = await axios.get("/bugs/getRequests");

    setRequests(response.data);
  };

  useEffect(() => {
    getRequests();
  }, []);

  // approve bug
  const handleApprove = async (data) => {
    let bugData = {
      id: data._id,
      foreign_id: data.foreign_id,
      name: data.name,
      assigned: data.assigned,
      status: "open",
      steps: data.steps,
      details: data.details,
      author: data.author,
      priority: data.priority,
    };

    if (admin && data.name !== "") {
      if (data.reason === "create") {
        await dispatch(postBug(bugData));
      } else if (data.reason === "edit") {
        bugData.status = data.status;
        await dispatch(editBug(bugData));
      }

      await axios.delete(`/bugs/request/${bugData.id}`);
      await getRequests();
    } else {
      toast.error("Oops, Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  // reject bug
  const handleReject = async (id) => {
    if (!admin || !id) {
      toast.error("Something went Wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      let response = await axios.delete(`/bugs/request/${id}`);
      await getRequests();
      toast.success(response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className="requests-page-wrapper">
      <div className="requests-div-wrapper">
        <h1 className="header">Requests</h1>
        {requests && requests.length > 0 ? (
          requests.map((req) => (
            <div key={req._id} className="request-wrapper">
              <div className="bug-details">
                <div className="form-group">
                  <label>Id: </label>
                  {req._id}
                </div>
                <div className="form-group">
                  <label>Bug Name:</label>
                  {req.name}
                </div>
                <div className="form-group">
                  <label>Priority: </label>
                  {req.priority}
                </div>
                <div className="form-group">
                  <label>Author:</label>
                  {req.author}
                </div>
                <div className="form-group">
                  <label>Assigned:</label>
                  {req.assigned}
                </div>
                <div className="form-group">
                  <label>Reason:</label>
                  {req.reason}
                </div>
                <div className="form-group">
                  <label>Details:</label>
                  {req.details}
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  {req.status}
                </div>
                <div className="form-group">
                  <label>Steps:</label>
                  {req.steps}
                </div>
              </div>
              <div className="btns">
                <FontAwesomeIcon
                  className="approve"
                  icon={faCheck}
                  size="2x"
                  onClick={() => handleApprove(req)}
                />
                <FontAwesomeIcon
                  className="reject"
                  icon={faX}
                  size="2x"
                  onClick={() => handleReject(req._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="no-requests">No Requests</div>
        )}
      </div>
    </div>
  );
};
