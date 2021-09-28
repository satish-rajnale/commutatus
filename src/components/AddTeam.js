import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Data from "../database/employee.json";

function AddTeam({ teamdata, role }) {
    const roleRef = useRef();

  const [teamName, setTeamName] = useState("");
  const [availTeamLeads, setAvailTeamLeads] = useState([]);
  const [teamLeadId, setTeamLeadId] = useState("");
  const [teamLeadName, setTeamLeadName] = useState("");
  useEffect(() => {
    const filterData = Data.filter((obj) => {
      if (obj.role === role && obj.level === 2) {
        return obj;
      }
    });
    setAvailTeamLeads(filterData);
  }, []);
  const addTeam = () => {
    if (teamLeadId=== "") {
      alert("Please select an employee of at least level 2!");
      return;
    }
    if(teamName === "" ){
        alert("Please select a name for the team");
        return;
    }
    const department = teamdata.filter((obj) => obj.role === role)[0].data;
    console.log(department)
    for (let i in department) {
      if (department[i].name === teamName) {
        alert(`Team name : ${teamName} is already in use.`);
        return;
      }
    }

    const newTeam = {
      name: teamName,
      lead: {
          name: teamLeadName
      },
      members: [],
    };
    const newteamdata = [...teamdata].map((obj) => {
      if (obj.role == role) {
        obj.data.push(newTeam);
      }
      return obj;
    });
    const url = "http://localhost:5000/addTeam";
    axios.post(url, newteamdata).then((response) => {
      // console.log(response);
    });
  };
  const handleSelectChange = (e) => {
    var index = e.target.selectedIndex;
  var optionElement = e.target.childNodes[index]
  var option =  optionElement.getAttribute('data-id');
  setTeamLeadId(option);
  };  
  return (
    <div className="container">
      <div className="formContainer">
        <h3>Add a Team</h3>
        <label>Name</label>
        <input
          className="addEmpInput"
          type="text"
          placeholder="name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <label>Team Lead</label>
        <select
          className="addEmpInput"
          value={ teamLeadName || '' } 
          ref={ roleRef }
          onChange={(e) => {
            // console.log({
            //   id: e.target.value,
            //   name: e.target.selectedOptions[0].text,
            // });
           handleSelectChange(e);
            setTeamLeadName(  e.target.value);
            
          }}
        >
          <option value="">Select</option>
          {availTeamLeads.map((obj) => (
            <option key={obj.id} data-id={obj.id} value={obj.name}>
              {obj.name}
            </option>
          ))}
        </select>
        <br />

        <button onClick={() => addTeam()}>Add Employee</button>
      </div>{" "}
    </div>
  );
}

export default AddTeam;
