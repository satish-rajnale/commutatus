import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Data from "./database/employee.json";

import axios from "axios";

import SideBar from "./containers/Sidebar";

import Departments from "./containers/Departments";
import TeamManagement from "./containers/TeamManagement";
import EmpManagement from "./containers/EmpManagement";
function App() {
  const [data, setData] = useState(Data);

  // const deletePost = (key) => {
  //   // filter out post containing that id
  //   let filterOutPost = [...data].filter((OBJ) => OBJ.id !== key);
  //   // save the rest in state
  //   setData(filterOutPost);

  //   // update write to json file
  //   saveJson(filterOutPost);
  // };

  // Write to JSON File

  // this function will receive all uodated state / posts after you add, edit delete post
  // const saveJson = (posts) => {
  //   // api URL // end point from node server / express server
  //   const url = "http://localhost:5000/addemploee";
  //   axios.post(url, posts).then((response) => {
  //     // console.log(response);
  //   });
  // };

  return (
    <div className="App">
      <Router>
        <div className="sidebar">
          <SideBar />
        </div>

        <Switch>
          <div className="contentBody">
            <Route exact path="/">
              <div>
                <h1>Welcome to HubStaff!</h1>
                <div>
                  <p>Please select your activity from the Sidebar.</p>
                </div>
              </div>
            </Route>
            <Route exact path="/empmanage">
              <EmpManagement />
            </Route>
            <Route exact path="/departments">
              <Departments />
            </Route>
            <Route exact path="/teams">
              <TeamManagement />
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
