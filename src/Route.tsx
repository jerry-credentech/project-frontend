import React from "react";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from './core/Home';
import PrivateRoute from "./auth/helper/PrivateRoutes";
import CreateDocument from "./user/CreateDocument";
import ManageCard from "./user/ManageDocument";
import UpdateDocument from "./user/UpdateDocument";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <PrivateRoute path="/home" exact component={Home} />
      <PrivateRoute path="/create/document" exact component={CreateDocument} />
      <PrivateRoute path="/manage/document/" exact component={ManageCard} />
      <PrivateRoute path="/card/update/:cardId" exact component={UpdateDocument} />
    </Switch>
    <ToastContainer limit={1} />
  </BrowserRouter>
);

export default Routes;
