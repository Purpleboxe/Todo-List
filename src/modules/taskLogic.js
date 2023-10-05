import task from './task.js';
import * as projectLogic from './projectLogic.js';
import {format, parseISO} from 'date-fns';

const overlay = document.querySelector('.overlay');

function addTask(task) {
    const id = document.querySelector('.selected').id;
    const currentProject = projectLogic.allProjects[id];
    
    currentProject.tasks.push(task);
    renderTasks(currentProject);
    
    projectLogic.saveProjects();

    console.log(currentProject);
}

function renderTasks(project) {
    const allTasks = document.getElementById('allTasks');
    const task = document.querySelectorAll('.task');
    task.forEach(task => {allTasks.removeChild(task)});

    project.tasks.map((task) => createTask(task, project.tasks))
}

function createTask(task, tasks) {
    const allTasks = document.getElementById('allTasks');
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.setAttribute('id', tasks.indexOf(task));

    const leftSide = document.createElement('div');
    leftSide.classList.add('leftSide');
    const rightSide = document.createElement('div');
    rightSide.classList.add('rightSide');
    const taskDetails = document.createElement('div');
    const taskName = document.createElement('div');
    taskName.innerText = task.name;
    const taskDescription = document.createElement('div');
    taskDescription.classList.add('taskDescription');
    taskDescription.innerText = task.description;
    const check = document.createElement('div');
    check.classList.add('unchecked');
    check.addEventListener('click', () => {
        allTasks.removeChild(newTask);
        tasks.splice(tasks.indexOf(task), 1);
        projectLogic.saveProjects();
    });
    const date = document.createElement('div');
    date.classList.add('taskDate');
    date.innerText = task.date;

    leftSide.appendChild(check);
    leftSide.appendChild(taskDetails);
    taskDetails.appendChild(taskName);
    taskDetails.appendChild(taskDescription);
    newTask.appendChild(leftSide);
    rightSide.appendChild(date);
    newTask.appendChild(rightSide);
    allTasks.appendChild(newTask);
}

const taskEventListeners = () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', openTaskForm);

    overlay.addEventListener('click', closeTaskForm);

    const addTaskForm = document.getElementById('addTaskForm');
    addTaskForm.onsubmit = (e) => {
        e.preventDefault();
        const name = e.target['taskName'].value;
        const description = e.target['taskDescription'].value;
        const dateValue = e.target['taskDate'].value;
        if (name.trim().length === 0 || dateValue == '') {
            alert('Name or date can not be empty!');
        } else {
            const date = format(parseISO(dateValue), "MM/dd/yyyy");
            const newTask = new task(name, description, date);
            addTask(newTask);

            closeTaskForm();
        }
    }
}

const openTaskForm = () => {
    const addTask = document.getElementById('addTask');
    const name = document.getElementById('taskName');
    const description = document.getElementById('taskDescription');
    const date = document.getElementById('taskDate');

    addTask.classList.add('active');
    overlay.classList.add('active');
    name.focus();
    name.value = '';
    description.value = '';
    date.value = '';
}

const closeTaskForm = () => {
    const addTask = document.getElementById('addTask');

    addTask.classList.remove('active');
    overlay.classList.remove('active');
}

export {taskEventListeners, renderTasks};