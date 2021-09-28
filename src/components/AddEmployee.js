import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
import Data from "../database/employee.json";
import BenchedData from "../database/benchedEmp.json";
import { v1 as uuidv1 } from 'uuid';
import axios from 'axios';


function AddEmployee({handleClose,handleTrasition}) {
    const nameRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const roleRef = useRef();
    const idRef = useRef();
  
    // State 
    const [data, setData] = useState(Data);
  
    // Temp State
    const [name, setName] = useState();
    const [contact, setcontact] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();
    const [id, setId] = useState("");
    // const [buttonState, setButtonState] = useState(true);

    // const [content, setContent] = useState();
  
    // const [updateID, setUpdateID] = useState();
    // const [updateTitle, setUpdateTitle] = useState();
    // const [updateContent, setUpdateContent] = useState();
  
    // Effect
    //////////////////////////////////////////
    useEffect(() => {
      // console.log(data);
      // setDate(Data)
      // clear form fields
      nameRef.current.value = null;
      contactRef.current.value = null;
      emailRef.current.value = null;
      roleRef.current.value = null;
      idRef.current.value = null;
    },[data]);
    
    const addEmployee = (e) => {
     
        e.preventDefault();
      const flag = checkIfIdExists();  
        if(name && contact && email && role && flag) {
          // create new post object
          let newPost = {
            "id": uuidv1(),
            "level":1,
            "user_id": id,
            "name": name,
            "contact": contact,
            "email": email,
            "role": role
          }
          // merge new post with copy of old state
          let posts = [...data, newPost];
          let benched = [...BenchedData, newPost];
          // push new object to state
          setData(posts);
          // clear title and content from state
    
          // update write to json file
          addUserData(posts, benched);
          setData();
          setEmail();
          setId("");
          setName();
          setcontact();
          handleClose();
          handleTrasition();
       }else{
         alert("Please fill all fields")
       }
      }  

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
      }
  
    const checkIfIdExists = () => {
          
        const index = data.findIndex((obj) => obj.user_id === id);
          if(index !== -1){
              alert("The user with selected Id already exists!");
              
                return false;
            }else if(id.trim() === ""){
              alert("Please select an unique Id!");
         
                return false;
          }
        
          return true;
      }
  
    return (
     
      <div className="container">
        <div className="formContainer" >
          <h4>Add New Employee</h4>
          <br/>
          <input 
          className="addEmpInput"
          placeholder="User Id" 
            onChange={ e => setId( e.target.value ) } 
      
            value={ id || '' } 
            ref={ idRef }
          />
          <input placeholder="Name" 
           className="addEmpInput"
            onChange={ e => setName( e.target.value ) } 
            value={ name || '' } 
            ref={ nameRef }
          />
          <input placeholder="contact" 
           className="addEmpInput"
            onChange={ e => setcontact( e.target.value ) } 
            value={ contact || '' } 
            ref={ contactRef }
          />
            <input placeholder="Email ID"
           className="addEmpInput" 
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
        
          <button  onClick={(e) =>  addEmployee(e) }>Add Employee</button>
        </div>
  </div>
  )
}

export default AddEmployee

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
    