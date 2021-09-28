import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddTeam from "../components/AddTeam";
import ModalUnstyledDemo from "../components/Modal";
import Team from "../components/Team";
import data from "../database/teams.json";

function TeamManagement() {
  const [department, setDepartment] = useState(false);

  const [openAddTeam, setOpenAddTeam] = useState(false);

  // useEffect(()=> {

  // },[])
  const handleOpen = (depName) => {
    setDepartment(depName);
    setOpenAddTeam(true);
  };
  return (
    <div className="teamBodyContainer">
      {data ? (
        data.map((item, index) => (
          <div key={index} className="teamDepartment">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "20px",
              }}
            >
              <h4>{item.department}</h4>

              <button
                className="addteamButton"
                onClick={() => handleOpen(item.role)}
              >
                Add a Team
              </button>
            </div>

            <div className="teamGrid">
              {item.data.map((teamdata, index) => (
                <Team data={teamdata} role={item.role} key={index} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <h3>No data available!</h3>
      )}
      <div></div>
      <ModalUnstyledDemo
        open={openAddTeam}
        handleClose={() => setOpenAddTeam(false)}
      >
        <AddTeam teamdata={data} role={department} />
      </ModalUnstyledDemo>
    </div>
  );
}

export default TeamManagement;
