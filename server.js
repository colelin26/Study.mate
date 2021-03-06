const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const studentRouter = require("./server/studyBuddy/student.router");
const groupRouter = require("./server/studyBuddy/group.router");

const app = express();
const port = process.env.PORT || 8081;
app.use("/student", studentRouter);
app.use("/study", groupRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Express Application started on ${port}!`));
