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
const path = require('path');
const express = require("express");
const projectData = require("./Modules/projects");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;
app.use(express.static('public'));

app.set('views', __dirname + '/views');

// Configure EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// home route
app.get('/', (req, res) => {
  res.render("home", { page: "/" });
});

//about me route
app.get('/about', (req, res) => {
  res.render("about", { page: "/about" });
});

//404 error route
app.get('/404', (req, res) => {
  res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for", page: "" });
});


// displays all projects or projects filtered by sector
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;
  
  if (sector) {
    // If sector query parameter is present, filter by sector
    projectData.getProjectsBySector(sector)
      .then((projects) => {
        res.render("projects", { projects: projects, page: "/solutions/projects" });
      })
      .catch((error) => {
        res.status(404).render("404", { message: "Unable to find requested sector", page: "/404" });
      });
  } else {
    // If no sector query parameter, return all projects
    projectData.getAllProjects()
      .then((projects) => {
        res.render("projects", { projects: projects, page: "/solutions/projects" });
      })
  }
});

// displays project with a specific id
app.get("/solutions/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id);

  projectData.getProjectById(projectId)
    .then((project) => {
      res.render("project", {project : project, page :"solutions/project"});
    })
    .catch((error) => {
      res.status(404).render("404", { message: "Unable to find requested project", page: "/404" });
    });
});

// if a route is not found sent 404 status to /404 with a message
app.use((req, res, next) => {
  res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for", page: "/404" });
});

// only starts up server if object is filled 
projectData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on: http://localhost:${HTTP_PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize project data:", error);
  });
