function createProject(projects, name) {
    const newProject = document.createElement('div');
    newProject.classList.add('project');

    const projectImg = document.createElement('img');
    projectImg.src = 'images/text-box-outline.svg';
    newProject.appendChild(projectImg);
    
    const projectName = document.createElement('div');
    projectName.innerText = name;
    newProject.appendChild(projectName);

    projects.appendChild(newProject);
}

const eventListeners = () => {
    const addProjectBtn = document.getElementById('addProjectBtn');
    addProjectBtn.addEventListener('click', openProjectForm);

    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', closeProjectForm);
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
    const name = document.getElementById('name');

    addProject.classList.remove('active');
    overlay.classList.remove('active');
}

export {createProject, eventListeners};