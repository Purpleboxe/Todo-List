import project from './project.js';
import {taskEventListeners, renderTasks} from './taskLogic.js';

const allProjects = [];
const projects = document.querySelector('.projects');
const body = document.getElementById('body');
const overlay = document.querySelector('.overlay');

function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(allProjects));
}

function restoreProjects(allProjects) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    if (projects) {
        projects.map((project) => {
            allProjects.push(project);
        });
    } {
        allProjects = [];
    }

    renderProjects();
}

function createProject(project) {
    const newProject = document.createElement('div');
    newProject.classList.add('project');

    newProject.setAttribute('id', allProjects.indexOf(project));

    const projectImg = document.createElement('img');
    projectImg.src = 'images/text-box-outline.svg';
    newProject.appendChild(projectImg);
    
    const projectName = document.createElement('div');
    projectName.innerText = project.name;
    newProject.appendChild(projectName);

    newProject.addEventListener('click', () => {
        setActiveButton(newProject);
        renderBody(project, project.name);
    });

    projects.appendChild(newProject);
}

function renderBody(project, name) {
    body.innerHTML = `
    <div class="top">
    <h2>${name}</h2>
    </div>
    <div class="divider"></div>
    <div id="allTasks"></div>
    <button id="addTaskBtn">+ New Task</button>
    `;

    const top = document.querySelector('.top');
    const deleteBtn = document.createElement('button');
    
    deleteBtn.classList.add('projectDelete');
    deleteBtn.innerText = 'Delete';
    top.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        removeProject(project);
    });

    taskEventListeners();

    const id = document.querySelector('.selected').id;
    const currentProject = allProjects[id];

    renderTasks(currentProject);
}

function renderProjects() {
    const project = document.querySelectorAll('.project');
    project.forEach(project => {projects.removeChild(project)});

    for (let i = 0; i < allProjects.length; i++) {
        createProject(allProjects[i]);
    }
}

function addProject(project) {
    allProjects.push(project);
    renderProjects();
    saveProjects();
}

function removeProject(project) {
    body.innerHTML = ``;
    allProjects.splice(allProjects.indexOf(project), 1);
    renderProjects();
    saveProjects();
}

const eventListeners = () => {
    const addProjectBtn = document.getElementById('addProjectBtn');
    addProjectBtn.addEventListener('click', openProjectForm);

    overlay.addEventListener('click', closeProjectForm);

    const addProjectForm = document.getElementById('addProjectForm');
    addProjectForm.onsubmit = (e) => {
        e.preventDefault();
        const name = e.target['projectName'].value;
        if (name.trim().length === 0) {
            alert('Name can not be empty!');
        } else {
            const newProject = new project(name);

            addProject(newProject);
            
            closeProjectForm();
            console.log(allProjects);
        }
    }
}

function setActiveButton(button) {
    const buttons = document.querySelectorAll('.project');

    buttons.forEach((button) => {
        if (button !== this) {
            button.classList.remove('selected');
        }
    });

    button.classList.add('selected');
}

const openProjectForm = () => {
    const addProject = document.getElementById('addProject');
    const name = document.getElementById('projectName');

    addProject.classList.add('active');
    overlay.classList.add('active');
    name.focus();
    name.value = '';
}

const closeProjectForm = () => {
    const addProject = document.getElementById('addProject');
    
    addProject.classList.remove('active');
    overlay.classList.remove('active');
}

export {eventListeners, allProjects, saveProjects, restoreProjects};
