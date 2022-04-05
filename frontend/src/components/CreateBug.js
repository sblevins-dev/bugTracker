import { Link } from 'react-router-dom';
import '../css/createbug.css';

export const CreateBug = () => {

    const handleCreate = (e) => {
        e.preventDefault();
    }

  return (
    <div className='create-page-wrapper'>
        <form className="create-bug-wrapper">
        <label>Date Created:</label>
        <input type="date" name="date"  />
        <label>Name:</label>
        <input type="text" name="name" />
        <label>Steps Taken:</label>
        <input type="text"  />
        <label>Details:</label>
        <textarea type="text"  />
        <div className="btns-wrapper">
          <button type="submit" className="save-btn" onClick={handleCreate}>
            Save
          </button>
          <Link to="/">
            <button className="cancel-btn">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  )
}
