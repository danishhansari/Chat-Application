import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const { handleRegister } = useAuth();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const handleInputChanges = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };
  return (
    <>
      <div className="auth--container">
        <div className="form--wrapper">
          <form
            onSubmit={(e) => {
              handleRegister(e, credentials);
            }}
          >
            <div className="field--wrapper">
              <label htmlFor="email">Name</label>
              <input
                type="text"
                id="name"
                required
                name="name"
                placeholder="Enter your name..."
                value={credentials.name}
                onChange={handleInputChanges}
              />
            </div>

            <div className="field--wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                name="email"
                placeholder="Enter your email..."
                value={credentials.email}
                onChange={handleInputChanges}
              />
            </div>

            <div className="field--wrapper">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                required
                name="password1"
                placeholder="Enter your Password"
                value={credentials.password1}
                onChange={handleInputChanges}
              />
            </div>
            <div className="field--wrapper">
              <label htmlFor="password">Confirm Password:</label>
              <input
                type="password"
                id="password"
                required
                name="password2"
                placeholder="Confirm your Password"
                value={credentials.password2}
                onChange={handleInputChanges}
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
          <p>
            Already have an account? Login <Link to={"/login"}>Here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
