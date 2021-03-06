import React, { useState } from "react";
import { signin, authenticate, isAutheticated } from "../auth/helper/index";
import { Redirect } from "react-router-dom";
import Menu from "../core/Menu";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setIsLoading(true);
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/home" />;
      } else {
        return <Redirect to="/home" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/home" />;
    }
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="spinner-border m-5 text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const signInForm = () => {
    return (
      <div className="row ">
        <div className="col-md-6 mt-5 offset-sm-3 justify-content-center">
          <form className="justify-content-center">
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                placeholder="Email"
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                placeholder="Password"
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            {isLoading ? (
              <div className="text-center">{loadingMessage()}</div>
            ) : (
              <div className="justify-content-center">
                <button
                  onClick={onSubmit}
                  className="btn btn-success btn-block mt-4"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base
    title="Sign In Page"
    description="Enter your Email and Password to login"
    >
      <div className="container mt-3">
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      </div>
    </Base>
  );
};

export default Signin;
