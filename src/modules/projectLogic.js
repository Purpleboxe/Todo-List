import project from './project.js';

const allProjects = [];
const projects = document.querySelector('.projects');
const body = document.getElementById('body');

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
        body.innerHTML = `
        <div class="top">
        <h3>${project.name}</h3>
        </div>
        `;

        const top = document.querySelector('.top');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('projectDelete');
        deleteBtn.innerText = 'Delete';
        top.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            removeProject(project);
        })
    });

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

function removeProject(project) {
    body.innerHTML = ``;
    allProjects.splice(allProjects.indexOf(project), 1);
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