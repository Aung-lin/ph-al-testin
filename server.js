const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

app.use(express.json());

app.use(cors());

const students = JSON.parse(fs.readFileSync(`${__dirname}/mark.json`));
let Students = students.Students;
console.log(students.Students);

// let Students = [
//   {
//     Rollnum: 1,
//     Name: "Timo",
//     TotalMarks: 400,
//   },
//   {
//     Rollnum: 2,
//     Name: "Kai",
//     TotalMarks: 512,
//   },
//   {
//     Rollnum: 3,
//     Name: "Austin",
//     TotalMarks: 352,
//   },
// ];

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/api/students", (req, res) => {
  res.json(Students);
});
app.get("/api/students/:id", (req, res) => {
  const Rn = Number(req.params.id);
  const student = Students.find((el) => el.Rollnum == Rn);
  if (student) res.json(student);
  else res.status(404).send("error");
  console.log(Rn);
});

const generateRollnum = () => {
  const newRollnum =
    Students.length > 0 ? Math.max(...Students.map((el) => el.Rollnum)) : 0;
  return newRollnum + 1;
};

app.post("/api/students", (req, res) => {
  const newStudent = req.body;

  const newObj = {
    Rollnum: generateRollnum(),
    Name: newStudent.Name,
    TotalMarks: newStudent.TotalMarks,
  };
  Students = Students.concat(newObj);
  console.log(newObj);
  res.json(newObj);
  // fs.write(`${__dirname}/mark.json`, JSON.stringify(newObj), (err) => {
  //   res.status(201).json({
  //     status: "success",
  //     data: {
  //       tours: newObj,
  //     },
  //   });
  // });
});

const port = 3001;
app.listen(port, () => console.log("Server is running"));
