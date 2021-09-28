const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs"); 
const morgan = require("morgan");
const cors = require("cors");

// Declare app
const app = express();
const port = 5000;

// middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// default route for server
app.get("/", (req, res) =>
  res.status(200).send({
    message: "Server is ruuning...",
  })
);

const WriteTextToFileAsync = async (contentToWrite, path) => {
  fs.writeFile(`./src/database/${path}.json`, contentToWrite, (err) => {
    console.log(contentToWrite);
    if (err) {
      console.log(err);
    } else {
      console.log("Done writing to file...");
    }
  });
};

const WriteTextToEmploeeFileAsync = async (contentToWrite) => {
  fs.writeFile("./src/database/employee.json", contentToWrite, (err) => {
    console.log(contentToWrite);
    if (err) {
      console.log(err);
    } else {
      console.log("Done writing to file...");
    }
  });
  
};


const WriteTextToBenchedFileAsync = async (contentToWrite) => {

  fs.writeFile("./src/database/benchedEmp.json", contentToWrite, (err) => {
    console.log(contentToWrite);
    if (err) {
      console.log(err);
    } else {
      console.log("Done writing to file...");
    }
  });
};


// Declare post / write route to accept incoming request with data
app.post("/benchedremove", async (req, res, next) => {
  // take the body from incoming request by using req.body and convert it into string
  const newTeamData = JSON.stringify(req.body.newTeamData);
  const filterData  = JSON.stringify(req.body.filterData);
  await WriteTextToFileAsync(newTeamData, "teams");
  await WriteTextToFileAsync(filterData, "benchedEmp");
  res.json({ msg: 'success' }); ;
});

app.post("/addemploee", async (req, res, next) => {
  // take the body from incoming request by using req.body and convert it into string
  const requestContent = JSON.stringify(req.body.employeeData);
  const benchedData  = JSON.stringify(req.body.benched);
  await WriteTextToEmploeeFileAsync(requestContent);
  await WriteTextToBenchedFileAsync(benchedData);
  res.json({ msg: 'success' }); 
});

app.post("/addTeam", async (req, res, next) => {
  // take the body from incoming request by using req.body and convert it into string
  const requestContent = JSON.stringify(req.body);
  await WriteTextToFileAsync(requestContent, "teams");
  res.json({ msg: 'success' }); 
});

app.post("/deleteEmp", async (req, res, next) => {
  // take the body from incoming request by using req.body and convert it into string
  const employeeData = JSON.stringify(req.body.employeeData);
  const benched  = JSON.stringify(req.body.benched);  
  const teamData  = JSON.stringify(req.body.teamData);

  await WriteTextToFileAsync(teamData, "teams");
  await WriteTextToFileAsync(benched, "benchedEmp");
  await WriteTextToFileAsync(employeeData, "employee");

  res.json({ msg: 'success' }); 
});

// 404 route for server
app.use((req, res, next) =>
  res.status(404).send({
    message: "Could not find specified route that was requested...!",
  })
);

// Run server
app.listen(port, () => {
  console.log(
    `
    on port ${port}
    http://localhost:5000
    `
  );
});
