import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { History } from 'history';

import { signout, isAutheticated } from "../auth/helper/index";

interface MenuProps {
  history: History,
}

const currentTab = (history: History, path: string) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu: React.FC<MenuProps> = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        {isAutheticated() && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/home")}
              className="nav-link"
              to="/home"
            >
              Home
            </Link>
          </li>
        )}
        {isAutheticated() && isAutheticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              U. Dashboard
            </Link>
          </li>
        )}
        {isAutheticated() && isAutheticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              A. Dashboard
            </Link>
          </li>
        )}
        {!isAutheticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}
        {isAutheticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
