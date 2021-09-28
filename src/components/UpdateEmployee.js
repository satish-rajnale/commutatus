import React, { useState, useEffect, useRef } from 'react';
import Data from "../database/employee.json";
import { v1 as uuidv1 } from 'uuid';
import axios from 'axios';
import BenchedData from "../database/benchedEmp.json";


function UpdateEmployee({userData, handleClose}) {
    
    const nameRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const roleRef = useRef();
    const idRef = useRef();
  

    const [data, setData] = useState(Data);
 
    const [name, setName] = useState();
    const [contact, setcontact] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();
    const [id, setId] = useState();
 

    useEffect(() => {

      console.log(userData);
        const {id, user_id, name, email, contact, role} = userData;
        setcontact(contact);
      
        setId(user_id);
        setName(name);
        setRole(role);
        setEmail(email);
    },[]);
    
    const UpdateEmployee = (e) => {
        e.preventDefault();
        if(name && contact && email && role) {
          // create new post object
          let updatedData = {
            "id": userData.id,
            "level":userData.level,
            "user_id": id,
            "name": name,
            "contact": contact,
            "email": email,
            "role": role
          }
          let filteredData = [...data].filter(OBJ=>OBJ.id!==userData.id);
          let posts = [...filteredData, updatedData];
          let newBenchedData = [...BenchedData];
          let isInbenched = [...BenchedData].findIndex(OBJ=>OBJ.id==userData.id);

          // merge new post with copy of old state
         
          if(isInbenched !== -1){
            let filtered = [...BenchedData].filter(OBJ=>OBJ.id!==userData.id);
            newBenchedData = [...filtered, updatedData];
          }
         
          // push new object to state
          setData(posts);
          // clear title and content from state
    
          // update write to json file
          addUserData(posts, newBenchedData);
      
          setData();
          setEmail();
          setId();
          setName();
          setcontact();
       }
      };  

    

      const addUserData = (employeeData,benched) => {
        const reqData = {
          employeeData: [...employeeData],
          benched:[...benched]
        }
        const url = 'http://localhost:5000/addemploee'
        axios.post(url, reqData)
        .then(response => {
          // console.log(response);
        });
        handleClose();
      }
  
    const checkIfIdExists = () => {
          
        const index = data.findIndex((obj) => obj.user_id === id);
          if(index !== -1){
              alert("The user with selected Id already exists!");
          };
          if(id.trim() === ""){
              alert("Please select an unique Id!");
          };
          return;
      }
  
    return (
      <div className="container">
      <div className="formContainer" >
          <h4>Update Employee Data</h4>
          <input placeholder="User Id" 
            disabled
            className="addEmpInput"
            style={{color:"#ffffff"}}
            onChange={ e => setId( e.target.value ) } 
            onBlur={() => checkIfIdExists()}
            value={ id || '' } 
            ref={ idRef }
          />
          <input placeholder="Name" className="addEmpInput"
            onChange={ e => setName( e.target.value ) } 
            value={ name || '' } 
            ref={ nameRef }
          />
          <input placeholder="contact" className="addEmpInput"
            onChange={ e => setcontact( e.target.value ) } 
            value={ contact || '' } 
            ref={ contactRef }
          />
         
          <input placeholder="Email ID" className="addEmpInput"
            onChange={ e => setEmail( e.target.value ) } 
            value={ email || '' } 
            ref={ emailRef }
          />
           <select placeholder="Job Role"
           className="addEmpInput" 
            onChange={ e => setRole( e.target.value ) } 
            value={ role || '' } 
            ref={ roleRef }
          >
             <option value="">Select</option>
            <option value="HR">Recruiter</option>
            <option value="Engineer">Engineer</option>
            <option value="Designer">Designer</option>
            </select>
          <br />
          {/* <textarea 
            placeholder="Content"
            onChange={ e => setContent( e.target.value ) } 
            value={ content || '' } 
            ref={ contentRef }
          ></textarea>
          <br /> */}
          <button onClick={(e) =>  UpdateEmployee(e) }>Update</button>
        </div>
  
        {/* If temp state has got values of title and content for update form show this */}
  
        {/* { updateTitle || updateContent ? 
          (
            <div>
              <h4>Update Post</h4>
              <input placeholder="Title" 
                onChange={ e => setUpdateTitle( e.target.value ) } 
                value={ updateTitle || '' } 
              />
              <br />
              <textarea
                placeholder="Content"
                onChange={ e => setUpdateContent( e.target.value ) } 
                value={ updateContent || '' } 
              ></textarea>
              <br />
              <button onClick={ updatePost }>Update Post</button>
            </div>
          ) : null }
  
        <div className="posts">
          { data ? data.map(post => {
            return(
              <div key={ post.id } className="post">
                <h3>{ post.title }</h3>
                <p>{ post.content }</p>
                <button onClick={ () => populatePost(post.id, post.title, post.content) }>Edit</button>
                <button onClick={ () => deletePost(post.id) }>Delete</button>
              </div>
            )
          }) : null }
          <div className="btn-download">
            <button onClick={ e => saveData(data) }>Download Data</button>
          </div>
        </div> */}
      </div>
  )
}

export default UpdateEmployee
