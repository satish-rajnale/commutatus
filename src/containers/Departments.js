import React from "react";
import data from "../database/department.json";
function Departments() {
  return (
    <div>
      {data.length > 0
        ? data.map((item, index) => (
            <div className="departments" key={index}>
                <div className="leftContent">
                <h3>Department Name&emsp;   </h3>
                <p>Description &emsp;   </p>
                <p>Teams  &emsp;  </p>
                <p>size &emsp;   </p>
                    </div>
                    <div className="rightContent">
                    <h3><span style={{fontWeight:400}}>: </span>&emsp;{item.name}   </h3>
                    <p>:     &emsp;        {item.description}</p>
                    <p>:     &emsp;         {item.teams.join(", ")}</p>
                    <p>:     &emsp;         {item.size}</p>
                    </div>
           
            </div>
          ))
        : <h2>No Departments!</h2>}
    </div>
  );
}

export default Departments;
