import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../css/requests.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { postBug } from "../Controllers/Redux/bugSlice";

export const Requests = () => {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  if (!admin) {
    navigate("/");
  }

  const formInitialState = {
    name: "",
    assigned: "",
    status: "open",
    steps: {},
    details: "",
    author: '',
  };

  const [formData, setFormData] = useState(formInitialState);

  const getRequests = async () => {
    let response = await axios.get("/bugs/getRequests");

    setRequests(response.data);
  };

  useEffect(() => {
    getRequests();
  }, []);

  // approve bug
  const handleApprove = async (data) => {
    setFormData(data)

    admin && formData.name !== '' && dispatch(postBug(formData))
    console.log(data)
  }

  // reject bug
  const handleReject = (data) => {

  }

  return (
    <div className="requests-page-wrapper">
      <div className="requests-div-wrapper">
        <h1 className="header">Requests</h1>
        {console.log(requests)}
        {requests && requests.length > 0 ? (
          requests.map((req) => (
            <div key={req._id} className="request-wrapper">
              <div className="bug-details">
                <div className="form-group">
                  <label>Bug Name:</label>
                  {req.name}
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
                  <label>Details:</label>
                  {req.details}
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  {req.status}
                </div>
                <div className="form-group">
                  <label>Steps:</label>
                  {req.name}
                </div>
              </div>
              <div className="btns">
                <FontAwesomeIcon className="approve" icon={faCheck} size="2x" onClick={() => handleApprove(req)} />
                <FontAwesomeIcon className="reject" icon={faX} size="2x" onClick={() => handleReject(req)} />
              </div>
            </div>
          ))
        ) : (
          <div>{console.log("no requests")}</div>
        )}
      </div>
    </div>
  );
};
