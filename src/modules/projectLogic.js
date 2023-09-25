import project from './project.js';

const allProjects = [];
const projects = document.querySelector('.projects');

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

    projects.appendChild(newProject);
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
}

const eventListeners = () => {
    const addProjectBtn = document.getElementById('addProjectBtn');
    addProjectBtn.addEventListener('click', openProjectForm);

    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', closeProjectForm);

    const addProjectForm = document.getElementById('addProjectForm');
    addProjectForm.onsubmit = (e) => {
        e.preventDefault();
        const name = e.target['name'].value;
        if (name == '') {
            alert('Name cannot be empty!');
        } else {
            const newProject = new project(name);
            addProject(newProject);
    
            closeProjectForm();
            console.log(allProjects);
        }
    }
}

const openProjectForm = () => {
    const addProject = document.getElementById('addProject');
    const overlay = document.querySelector('.overlay');
    const name = document.getElementById('name');

    addProject.classList.add('active');
    overlay.classList.add('active');
    name.focus();
    name.value = '';
}

const closeProjectForm = () => {
    const addProject = document.getElementById('addProject');
    const overlay = document.querySelector('.overlay');

    addProject.classList.remove('active');
    overlay.classList.remove('active');
}

export {eventListeners};