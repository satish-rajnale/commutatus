import React, { useEffect } from "react";
import ModalUnstyledDemo from "./Modal";
import StickyHeadTable from "./TableWithData";
import Data from "../database/employee.json";
import Teams from "../database/teams.json";
import Benched from "../database/benchedEmp.json";
import AddToTeam from "./AddToTeam";
import axios from "axios";

const rows = [...Data];

function Team({ data, role }) {
  const [teamData, setTeamData] = React.useState([]);
  const [notinTeamData, setNotinTeamData] = React.useState([]);

  const [openView, setOpenView] = React.useState(false);
  const [openAddmember, setOpenAddmember] = React.useState(false);
  useEffect(() => {
    // console.log("this is team", data);
    const filtereddata = rows.filter((obj) => {
      for (let i in data.members) {
        const memberId = data.members[i].id;
        if (obj.id === memberId) {
          return obj;
        }
      }
      return;
    });

    const availableEmp = Benched.filter((obj) => {
      if (obj.role === role) {
        return obj;
      }
    });
    // console.log("availableEmp", availableEmp);
    setNotinTeamData(availableEmp);
    setTeamData(filtereddata);
  }, []);

  const addToTeam = (_id) => {
    const filterBenchedData = Benched.filter((obj) => {
      if (obj.id !== _id) {
        return obj;
      }
      return;
    });
    console.log("data", data);
    const newArr = data.members;
    console.log(newArr);
    // const newTeamData = ;
    // console.log("newTeamData",newTeamData);
    const replaceTeamData = [...Teams].map((obj) => {
      if (obj.role === role) {
        for (let i in obj.data) {
          const teamObj = obj.data[i];
          if (teamObj.name === data.name) {
            obj.data[i].members.push({ id: _id });
          }
        }
      }
      return obj;
    });
    const reqBody = {
      newTeamData: [...replaceTeamData],
      filterData: [...filterBenchedData],
    };
    const url = "http://localhost:5000/benchedremove";
    axios.post(url, reqBody).then((response) => {
      // console.log(response);
    });

    setNotinTeamData();
    setOpenAddmember(false);
  };

  return (
    <div className="teamCard">
      <h4>{data.name}</h4>
      <p>Team Lead : {data.lead.name}</p>
      <div style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
        <button className="cardButton" onClick={() => setOpenView(true)}>
          View team Members
        </button>

        <button className="cardButton" onClick={() => setOpenAddmember(true)}>
          Add a member
        </button>
        <ModalUnstyledDemo
          open={openView}
          handleClose={() => setOpenView(false)}
        >
          <StickyHeadTable rows={teamData} />
        </ModalUnstyledDemo>
        <ModalUnstyledDemo
          open={openAddmember}
          handleClose={() => setOpenAddmember(false)}
        >
          <AddToTeam data={notinTeamData} addtoTeam={addToTeam} />
        </ModalUnstyledDemo>
      </div>
    </div>
  );
}

export default Team;
