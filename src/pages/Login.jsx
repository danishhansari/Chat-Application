import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { user, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
    console.log(credentials);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="auth--container">
        <div className="form--wrapper">
          <form
            onSubmit={(e) => {
              handleLogin(e, credentials);
            }}
          >
            <div className="field--wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                name="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={handleInput}
              />
            </div>

            <div className="field--wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                name="password"
                placeholder="Enter your Password"
                value={credentials.password}
                onChange={handleInput}
              />
            </div>

            <div className="field--wrapper">
              <input
                type="submit"
                value="Login"
                className="btn btn--lg btn--main"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
