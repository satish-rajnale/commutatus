import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableRow,
  TableHead,
  TablePagination,
  TableContainer,
  IconButton,
  TableCell,
  TableBody,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import ModalUnstyledDemo from "./Modal";
import UpdateEmployee from "./UpdateEmployee";
import EmpData from "../database/employee.json";
import BenchedData from "../database/benchedEmp.json";
import TeamData from "../database/teams.json";
import axios from "axios";

const columns = [
  { id: "user_id", label: "Id", minWidth: "50px" },
  { id: "name", label: "Name", minWidth: "50px" },
  { id: "email", label: "Email", minWidth: "50px" },
  {
    id: "contact",
    label: "Contact",
    minWidth: "50px",
  },
  {
    id: "role",
    label: "Role",
    minWidth: "50px",
  },
  {
    id: "actions",
    label: "Actions",
    align: "left",
    maxWidth: "50px",
  },
];

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
export default function StickyHeadTable({ rows }) {
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [dataToUpdate, setDataToUpdate] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteEmployee = (id) => {
    let flag = window.confirm("Are you sure you want to delete this record");
    if (flag) {
      const employeeData = EmpData.filter((obj) => obj.id !== id);
      const benchedData = BenchedData.filter((obj) => obj.id !== id);
      const teamData = TeamData.filter((obj) => {
        // for(let i in TeamData){
        //   let obj = TeamData[i];
        obj.data = obj.data.filter((team) => {
          // for(let mindex in team.members){
          //   if(team.members[mindex].id !== )
          // }
          team.members = team.members.filter((obj) => obj.id !== id);
          return team;
        });
        return obj;
        // }
      });

      const reqData = {
        employeeData: [...employeeData],
        benched: [...benchedData],
        teamData: [...teamData],
      };
      const url = "http://localhost:5000/deleteEmp";
      axios.post(url, reqData).then((response) => {
        // console.log(response);
      });
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {rows.length == 0 ? (
        <h2>No data available!</h2>
      ) : (
        <TableContainer sx={{ maxHeight: 660, minWidth: 900 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ backgroundColor: "black", color: "white" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.user_id}
                    >
                      {columns.map((column) => {
                        let value = "";
                        if (column.id == "actions") {
                          value = (
                            <>
                              {" "}
                              <IconButton
                                aria-label="update"
                                color="info"
                                onClick={() => {
                                  setDataToUpdate(row);
                                  setUpdateModalOpen(true);
                                }}
                              >
                                <CreateIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                color="error"
                                onClick={() => {
                                  deleteEmployee(row.id);
                                  handleClick(SlideTransition);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          );
                        } else {
                          value = row[column.id];
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        style={{ display: rows.length > 10 ? "" : "none" }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModalUnstyledDemo
        open={updateModalOpen}
        handleClose={() => setUpdateModalOpen(false)}
      >
        <UpdateEmployee
          userData={dataToUpdate}
          handleClose={() => setUpdateModalOpen(false)}
          handleTrasition={handleClick(SlideTransition)}
        />
      </ModalUnstyledDemo>

      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        key={state.Transition.name}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: "green", color: "white" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </Paper>
  );
}
