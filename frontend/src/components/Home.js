import { useEffect, useState } from "react";
import { Bugs } from "./Bugs";
import "../css/home.css";

export const Home = ({bugs}) => {
  const [keyword, setKeyword] = useState("");
  
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [status, setStatus] = useState("");

  

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleRadioSelection = (e) => {
    setStatus(e.target.value);
    console.log(status)
  };

  const filterBugs = (temp) => {
    let tempBugs;
    tempBugs =
      keyword !== ""
        ? temp.filter((bug) => {
            return (
              (bug.description.toLowerCase().includes(keyword.toLowerCase()) ||
                bug.name.toLowerCase().includes(keyword.toLowerCase()) &&
              (status !== "all"  &&
              bug.status === status)) || (
                bug.description.toLowerCase().includes(keyword.toLowerCase()) ||
                bug.name.toLowerCase().includes(keyword.toLowerCase())
              )
            );
          })
        : bugs;
    if (tempBugs.length === 0) {
      tempBugs = ["nothing"];
    }
    return tempBugs;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let temp = bugs;
    setFilteredBugs(filterBugs(temp));
  };

  return (
    <div className="home-wrapper">
      <div className="search-wrapper">
        <form className="form-wrapper">
          <div className="form-group">
            <label>Keywords: </label>
            <input type="text" onChange={handleKeywordChange}></input>
          </div>
          <div className="form-group">
            <label className="radio-header">Case Status: </label>
            <div className="radio-group">
              <input
                type="radio"
                id="all"
                name="status"
                value="all"
                onChange={handleRadioSelection}
              ></input>
              <label htmlFor="all" className="first-select">All </label>
              <input
                type="radio"
                id="open"
                name="status"
                value="open"
                onChange={handleRadioSelection}
              ></input>
              <label htmlFor="open" className="first-select">
                Open 
              </label>
              <input
                type="radio"
                id="closed"
                name="status"
                value="closed"
                onChange={handleRadioSelection}
              ></input>
              <label htmlFor="closed"> Closed</label>
            </div>
          </div>
          <div className="form-group dropdown-wrapper">
            <div className="dropdown-group">
              <label className="min-age-label">Min-Age: </label>
              <select id="min-age">
                <option defaultValue>--Select--</option>
                <option value="30">30days</option>
                <option value="6">6 Months</option>
                <option value="1">1 Year</option>
              </select>
            </div>
            <div className="dropdown-group">
              <label className="max-age-label">Max-Age: </label>
              <select id="max-age">
                <option defaultValue>--Select--</option>
                <option value="30">30days</option>
                <option value="6">6 Months</option>
                <option value="1">1 Year</option>
              </select>
            </div>
          </div>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      <Bugs data={filteredBugs.length === 0 ? bugs : filteredBugs} />
    </div>
  );
};
