const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

// fills the projects object by copying data from projectData and adds corresponding sector name
function initialize() {
    return new Promise((resolve, reject) => {

        //for each project create a copy add the sector name in and add completed array back
        projectData.forEach(project => {
            // Create a copy of project
            let projectCopy = { ...project };
            
            // Find the matching sector id and use it copy the sector name into the new object
            let sector = sectorData.find(sector => sector.id === project.sector_id);
            projectCopy.sector = sector.sector_name;

            // return the new object 
            projects.push(projectCopy);
        });
        resolve();
    });
}

// return a copy of the completed projects array
function getAllProjects() {
    return new Promise((resolve, reject) => {
        resolve(projects);
    });
}

//Find and returns a specific project using it's id 
function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        let project = projects.find(p => p.id === (projectId));
        if (project) {
            resolve(project);
        } else {
            reject("error");
        }
    });
}

// find and returns all projects that have a given sector id
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        let filteredProjects = projects.filter(project => 
            project.sector.toLowerCase().includes(sector.toLowerCase())
        );
        
        if (filteredProjects.length > 0) {
            resolve(filteredProjects);
        } else {
            reject("error");
        }
    });
}

module.exports = { 
  initialize,
  getAllProjects, 
  getProjectById, 
  getProjectsBySector 
};