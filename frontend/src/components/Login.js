import "../css/login.css";

export const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-wrapper">
      <form className="form">
        <h1>Login</h1>
        <div className="form-group">
          <label className="username">Username:</label>
          <input type="text"></input>
        </div>
        <div className="form-group">
          <label className="password">Password:</label>
          <input type="password"></input>
        </div>
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};
