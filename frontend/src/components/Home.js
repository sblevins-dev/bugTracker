import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBugs } from "../Controllers/Redux/bugSlice";
import { Bugs } from "./Bugs";
import { Statistics } from "./Statistics";
import "../css/home.css";

export const Home = () => {
  // Redux
  const dispatch = useDispatch();
  const { bugsList } = useSelector((state) => state.bugs);

  // set keyword for search
  const [keyword, setKeyword] = useState("");

  // set bug list to filtered list
  const [filteredBugs, setFilteredBugs] = useState([]);

  // set for minimum date search choice
  const [minDate, setMinDate] = useState(null);

  // call when bugs length is less than 1
  useEffect(() => {
    dispatch(fetchBugs());
  }, [dispatch]);

  // set keyword search term
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // Date format
  const formatDate = (createdAt) => {
    let tempDate = createdAt.split("T");
    let tempDate2 = tempDate[0].split("-");
    let newDate = tempDate2[1] + "-" + tempDate2[2] + "-" + tempDate2[0];

    return newDate;
  };

  // compare dates
  const compareDates = (tempBugs) => {
    let dateToCheck, newDate, difference, filteredBugs;

    // create date to compare
    let todaysDate = new Date();

    // filter according to search selection
    filteredBugs = tempBugs.filter((bug) => {
      dateToCheck = formatDate(bug.createdAt).split("-");
      newDate = new Date(
        Number(dateToCheck[2]),
        Number(dateToCheck[0]) - 1,
        Number(dateToCheck[1])
      );

      difference =
        Math.abs(newDate.getTime() - todaysDate.getTime()) /
        (1000 * 60 * 60 * 24.0);

      return difference < minDate && bug;
    });

    return filteredBugs;
  };

  // filter bug list by search terms
  const filterBugs = (temp) => {
    let tempBugs;
    tempBugs =
      keyword !== ""
        ? temp.filter(
            (bug) =>
              (bug.author !== undefined &&
                bug.author.toLowerCase().includes(keyword.toLowerCase())) ||
              (bug.name !== undefined &&
                bug.name.toLowerCase().includes(keyword.toLowerCase()))
          )
        : bugsList;

    tempBugs =
      minDate !== null && minDate !== "--Select--" && tempBugs !== undefined
        ? compareDates(tempBugs)
        : tempBugs;

    if (tempBugs.length === 0) {
      tempBugs = ["nothing"];
    }

    return tempBugs;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword !== '') {
      setFilteredBugs(filterBugs(bugsList));
    }
  };

  const handleAll = () => {
    setFilteredBugs(bugsList);
  };

  // filter for open status bugs
  const handleOpen = () => {
    setFilteredBugs(bugsList.filter((bug) => bug.status === "open"));
  };

  // filter for closed status bugs
  const handleClose = () => {
    setFilteredBugs(bugsList.filter((bug) => bug.status === "closed"));
  };

  // filter for priority level bugs
  const handlePriority = (level) => {
    setFilteredBugs(
      bugsList.filter((bug) => bug.priority === level.toLowerCase())
    );
  };

  return (
    <div className="home-wrapper">
      {/* <Statistics
        bugs={bugsList}
        open={handleOpen}
        all={handleAll}
        close={handleClose}
        priority={handlePriority}
      /> */}
      <div className="search-wrapper">
        <form className="form-wrapper">
          <h1>Search</h1>
          <div className="form-group">
            <label>Keywords: </label>
            <input type="text" onChange={handleKeywordChange}></input>
          </div>
          <div className="form-group dropdown-wrapper">
            <div className="dropdown-group">
              <label className="min-age-label">Min-Age: </label>
              <select id="min-age" onChange={(e) => setMinDate(e.target.value)}>
                <option defaultValue>--Select--</option>
                <option value="15">15 Days</option>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
                <option value="365">1 Year</option>
              </select>
            </div>
          </div>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      <Statistics
        bugs={bugsList}
        open={handleOpen}
        all={handleAll}
        close={handleClose}
        priority={handlePriority}
      />
      <div className="results">
        {bugsList &&
        filteredBugs &&
        filteredBugs !== null &&
        filteredBugs.length === 0
          ? bugsList.length
          : filteredBugs[0] === "nothing"
          ? "0"
          : filteredBugs.length}{" "}
        Results
      </div>
      <Bugs
        bugs={
          bugsList && filteredBugs !== null && filteredBugs.length === 0
            ? bugsList
            : filteredBugs
        }
        dateFunction={formatDate}
      />
    </div>
  );
};
