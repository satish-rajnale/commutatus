import React from "react";

function AddToTeam({ data ,addtoTeam}) {
  return (
<div>
    {data.length === 0 ? (
        <h3>No benched employees available.</h3>
      ) : (
        <div style={{height:740, overflowY:"auto", alignItems:"center", justifyContent:"center"}}>
      {  data.map((item, index) => (
    

          <div className="departments" key={index} style={{width:640,justifyContent:"space-between", alignItems:"center"}}>
            <div className="leftContent">
              <h3> Name&emsp; </h3>
              <p>Id &emsp; </p>
              <p>Email &emsp; </p>
              <p>Contact &emsp; </p>
              <p>Role &emsp; </p>
            </div>
            <div className="rightContent">
              <h3>
                <span style={{ fontWeight: 400 }}>: </span>&emsp;{item.name}{" "}
              </h3>
              <p>: &emsp; {item.user_id}</p>
              <p>: &emsp; {item.email}</p>
              <p>: &emsp; {item.contact}</p>
              <p>: &emsp; {item.role}</p>
            </div>
            <div>
                <button  className="cardButton" style={{width:170}} onClick={()=>addtoTeam(item.id)}>Add to Team</button>
                </div>
          </div>
         
        ))}
        </div>)}
    </div>
  );
}

export default AddToTeam;
