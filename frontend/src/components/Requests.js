import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/requests.css";

export const Requests = () => {
  const { admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!admin) {
    navigate("/");
  }

  return (
    <div className="requests-page-wrapper">
      <form className="requests-form-wrapper">
        <div className="form-group"></div>
      </form>
    </div>
  );
};
