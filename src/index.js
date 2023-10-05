import {eventListeners, allProjects, restoreProjects} from './modules/projectLogic.js';

eventListeners();
restoreProjects(allProjects);