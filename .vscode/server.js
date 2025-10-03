/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Jainam Shah Student ID: 111085221 Date: 2025/10/02
*
********************************************************************************/

const express = require("express");
const projectData = require("./modules/projects");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Assignment 2: Jainam Shah - 111085221");
});

app.get("/solutions/projects", (req, res) => {
  projectData.getAllProjects()
    .then((projects) => {
      res.json(projects);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/solutions/projects/id-demo", (req, res) => {
  projectData.getProjectById(9)
    .then((project) => {
      res.json(project);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

app.get("/solutions/projects/sector-demo", (req, res) => {
  projectData.getProjectsBySector("agriculture")
    .then((projects) => {
      res.json(projects);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

projectData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on: http://localhost:${HTTP_PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize project data:", error);
  });