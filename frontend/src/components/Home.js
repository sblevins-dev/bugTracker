import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBugs } from '../Controllers/Redux/bugSlice';
import { fetchBugs } from "../Controllers/Redux/bugSlice";
import { Bugs } from "./Bugs";
import { Statistics } from './Statistics';
import "../css/home.css";

export const Home = () => {

  // Redux
  const dispatch = useDispatch();
  const { bugs } = useSelector(state => state);

  // set keyword for search
  const [keyword, setKeyword] = useState("");
  
  // set bug list to filtered list
  const [filteredBugs, setFilteredBugs] = useState([]);

  // set status for search
  const [status, setStatus] = useState("");

  // call when bugs length is less than 1
  useEffect(() => {
    dispatch(fetchBugs());
  }, [bugs.length < 1]);

  // set keyword search term
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // handle radio buttons for search
  const handleRadioSelection = (e) => {
    setStatus(e.target.value);
  };

  // filter bug list by search terms
  const filterBugs = (temp) => {
    let tempBugs;
    tempBugs =
      keyword !== ""
        ? temp.filter((bug) => {
            return (
              (bug.details.toLowerCase().includes(keyword.toLowerCase()) ||
                bug.name.toLowerCase().includes(keyword.toLowerCase()) ||
                 bug.author.toLowerCase().includes(keyword.toLowerCase()) &&
              (status !== "all"  &&
              bug.status === status)) || (
                bug.details.toLowerCase().includes(keyword.toLowerCase()) ||
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
    setFilteredBugs(filterBugs(bugs));
  };

  const handleAll = () => {
    setFilteredBugs(bugs)
  }

  const handleOpen = () => {
    setFilteredBugs(bugs.filter(bug => bug.status === 'open'))
  }

  const handleClose = () => {
    setFilteredBugs(bugs.filter(bug => bug.status === 'closed'))
  }

  return (
    <div className="home-wrapper">
      <Statistics bugs={bugs} open={handleOpen} all={handleAll} close={handleClose} />
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
