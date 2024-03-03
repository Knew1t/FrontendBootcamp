import React, { useEffect, useState } from "react";
import "./login.css";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const radioHandler = () => {
    if (checked) {
      navigate("/company-signup");
    } else {
      navigate("/signup");
    }
    setChecked(!checked);
  };
  return (
    <div className="login">
      {location.pathname != "/login" &&
        (
          <>
            <div className="radio">
              <label htmlFor="company">Company</label>
              <input
                type="radio"
                name="radio"
                value="company"
                className="radio"
                checked={location.pathname === "/company-signup"}
                onChange={radioHandler}
              />
            </div>
            <div className="radio">
              <label htmlFor="radio">Employee</label>
              <input
                type="radio"
                name="radio"
                className="radio"
                checked={location.pathname !== "/company-signup"}
                onChange={radioHandler}
              />
            </div>
          </>
        )}
      {location.pathname == "/company-signup" &&
        (
          <div>
            <label htmlFor="login">Company name</label>
            <input type="text" name="company" />
          </div>
        )}
      <label htmlFor="login">login</label>
      <input type="login" name="login" />
      <label htmlFor="passwod">password,</label>
      <input type="password" name="password" />
      {location.pathname != "/login" &&
        (
          <>
            <label htmlFor="repeat">repeat password</label>
            <input type="password" name="repeat" />
          </>
        )}
      {location.pathname === "/login"
        ? (
          <div className="login-text">
            New to BestVacancies? <Link to="/signup">Create An Accout</Link>
          </div>
        )
        : (
          <div className="login-text">
            Already have an Account? <Link to="/login">sign in</Link>
          </div>
        )}
      <div className="buttonFlex">
        <input
          type="button"
          className="login-button"
          value={location.pathname !== "/login" ? "Sign up" : "Sign in"}
        />
      </div>
    </div>
  );
}

export default Login;
