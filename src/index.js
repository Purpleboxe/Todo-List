import {createProject, eventListeners} from './modules/projectLogic';

const allProjects = [];
const projects = document.querySelector('.projects');

eventListeners();
createProject(projects, 'Default');