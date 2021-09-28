import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default function SideBar() {
  const paths = [
    {name:"Home", path:""},
    {name:"Employee Management", path:"empmanage"},
    {name:"Departments", path:"departments"},
    {name:"Team Management", path:"teams"},
  ];
  return (
   
    <div style={{width:"14em",backgroundColor:"#2d333b",paddingTop:"9rem", height:"100%"}}>
     
      
        
        
        <List >
          {paths.map(({name, path}, index) => (

            <ListItem sx={{alignItems:"center", width:"13rem", marginBottom:"1rem"}} button key={name}>
             <Link to={`/${path}`} style={{color:"inherit", display:"inherit", textDecoration:"none"}}>
     
        
              <ListItemIcon sx={{verticalAlign:"baseline"}}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <Typography  gutterBottom sx={{ fontWeight:"bold"}}>
              {name}
              </Typography>
              {/* <ListItemText    primary={name}/> */}
              </Link>
              
            </ListItem>
          ))}
        </List>
        <Divider />
       
   
      </div>
   
  );
}
