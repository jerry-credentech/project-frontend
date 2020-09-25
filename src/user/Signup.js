import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Menu from "../core/Menu";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const [isLoading, setIsloading] = useState(false);

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left mt-5">
            <h2 className="text-center">Sign Up Page</h2>
            <form>
              <div className="form-group">
                <label className="text-dark">Name</label>
                <input
                  placeholder="Enter your Name Here"
                  className="form-control"
                  onChange={handleChange("name")}
                  type="text"
                  value={name}
                />
              </div>
              <div className="form-group">
                <label className="text-dark">Email</label>
                <input
                  placeholder="Enter your Email Here"
                  className="form-control"
                  onChange={handleChange("email")}
                  type="email"
                  value={email}
                />
              </div>

              <div className="form-group">
                <label className="text-dark">Password</label>
                <input
                  placeholder="Enter your Password Here"
                  onChange={handleChange("password")}
                  className="form-control"
                  type="password"
                  value={password}
                />
              </div>
              <button onClick={onSubmit} className="btn btn-success btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
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

  return (
    <div>
      <Menu />

      {errorMessage()}
      {signUpForm()}
      {successMessage()}
    </div>
  );
};

export default Signup;
