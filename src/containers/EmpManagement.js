import { Alert, IconButton, Slide, Snackbar } from "@mui/material";
import React from "react";
import StickyHeadTable from "../components/TableWithData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddEmployee from "../components/AddEmployee";
import ModalUnstyledDemo from "../components/Modal";
import Fade from '@mui/material/Fade';
import Data from "../database/employee.json";


const rows = [...Data];
function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
function EmpManagement() {
    const [addmodelOpen, setAddModelOpen] = React.useState(false);
    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
      });
    const handleClick = (Transition) => () => {
        setState({
          open: true,
          Transition,
        });
      };
      const handleSnackClose = () => {
        setState({
          ...state,
          open: false,
        });
      };
    const handleOpen = () => setAddModelOpen(true);
    const handleClose = () => setAddModelOpen(false);
  return (
    <div className="container">
      <div
        style={{
          width: "100%",
          padding: "20px",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <div>
          <button
            aria-label="add employee"
         className="addEmpmodalBtn"
          onClick={()=>handleOpen()}
          >
            <PersonAddIcon /> &nbsp; Add Employee
          </button>
        </div>
      </div>
     
      <StickyHeadTable rows={rows}/>
      <ModalUnstyledDemo open={addmodelOpen} handleClose={handleClose} >
          <AddEmployee  handleClose={handleClose} handleTrasition={handleClick(SlideTransition)} />
        </ModalUnstyledDemo>
        
        <Snackbar
        open={state.open}
        onClose={handleSnackClose}
        TransitionComponent={state.Transition}
       
        key={state.Transition.name}
      ><Alert onClose={handleClose} severity="success" sx={{ width: '100%',backgroundColor:"green", color:"white" }}>
      This is a success message!
    </Alert></Snackbar>
    </div>
  );
}

export default EmpManagement;
