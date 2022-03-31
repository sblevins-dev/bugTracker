import { Bugs } from './Bugs';
import "../css/home.css";

export const Home = () => {
    const bugs = [
      {
        id: 1,
        name: 'John Smith',
        status: 'open',
        description: 'Test bug 1',
        date: '03-30-2022'
      },
      {
        id: 2,
        name: 'John Smith',
        status: 'closed',
        description: 'Test bug 2',
        date: '12-30-2021'
      }
    ]

    const handleSearch = (e) => {
        e.preventDefault();
    }

  return (
    <div className="home-wrapper">
      <div className="search-wrapper">
        <form className="form-wrapper">
          <div className="form-group">
            <label>Keywords: </label>
            <input type="text"></input>
          </div>
          <div className="form-group">
            <label className="radio-header">Case Status: </label>
            <div className="radio-group">
               <input type="radio" id="open" name="status" value='open'></input>
               <label htmlFor="open" className="first-select"> Open</label>
               <input type="radio" id="closed" name="status" value='closed'></input>
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
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </form>
      </div>
      <Bugs data={bugs} />
    </div>
  );
};
