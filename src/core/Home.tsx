import React from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper/index";
import Base from "./Base";

const Home: React.FC = () => {
  const {
    user: { name, email },
  } = isAutheticated();

  const AdminLeftSide: React.FC = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/create/document" className="nav-link text-success">
              Create New Document
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/manage/document" className="nav-link text-success">
              Manage Documents
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const AdminRightSide: React.FC = () => {
    return (
      <div className="card">
        <h4 className="card-header text-dark">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-info">Verified</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to your dashboard"
      description="Manage all of your documents Here"
      className="container bg-success p-4"
    >
      <div className="container justify-content-center mt-3">
        <div className="row">
          <div className="col-3"><AdminLeftSide /></div>
          <div className="col-9"><AdminRightSide /></div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
