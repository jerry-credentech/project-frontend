import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Menu from "../core/Menu";
import notify from '../notify';

interface ValuesInterface{
  name: string,
  email: string,
  password: string,
  error: string,
  success: string,
};

const Signup: React.FC = () => {
  const [values, setValues] = useState<ValuesInterface>({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
  });
  const { name, email, password, success } = values;
  
  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: "" });
          notify(data.error);
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: "New account was created successfully.",
          });
          notify("New account was created successfully.");
        }
      })
      .catch(() => notify("Error in signup"));
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

  return (
    <div>
      <Menu />
      {signUpForm()}
      {successMessage()}
    </div>
  );
};

export default Signup;
