import { Projects } from "../projects";
import { ToDos } from "../todos";
import { renderMainSection, renderProjectList } from "./render";

export function expandTaskDetails() {
    const taskItems = document.querySelectorAll('.task-item');

    taskItems.forEach(item => {
        const main = item.querySelector('.task-main'); // only this area should toggle
        const details = item.querySelector('.task-details');
        const label = main.querySelector('label');

        main.addEventListener('click', (e) => {
            // Allow checkbox to work normally, don't toggle on it
            if (e.target.tagName.toLowerCase() === 'input' && e.target.type === 'checkbox') return;
            details.classList.toggle('show');
        });
    });
}


export function addNewTask() {
    const modal = document.getElementById('task-modal');
    const addBtn = document.getElementById('add-new-task');
    const closeBtn = document.querySelector('.close-btn');
    const taskForm = document.getElementById('task-form');

    // Open modal
    addBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submit
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('new-title').value;
        const desc = document.getElementById('new-desc').value;
        const dueDate = document.getElementById('new-due').value;
        const priority = document.getElementById('new-priority').value;

        
        const newToDo = new ToDos(title, desc, dueDate, priority);
        console.log({ title, desc, dueDate, priority }); // later append to list
        renderMainSection();
        expandTaskDetails();
        modal.style.display = 'none';
        taskForm.reset();
    });
}

export function switchProjectsListener() {
    const sideButtons = document.querySelectorAll('.side-task-btn');

    sideButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if(btn.dataset.projectId) {
                Projects.currentProjectId = Number(btn.dataset.projectId);
                renderMainSection();
                expandTaskDetails();
            }
        });
    });
}

export function addProjectListener() {
    const addProjectButton = document.getElementById('add-project');
    const projectModal = document.getElementById('project-modal');
    const closeBtn = projectModal.querySelector('.close-btn');
    const projectForm = document.getElementById('project-form');
    const sideProjectsContainer = document.querySelector('.side-project-buttons');

    // Open modal
    addProjectButton.addEventListener('click', () => {
        projectModal.style.display = 'flex';
        document.getElementById('project-title').focus();
        });

    // Close modal
    closeBtn.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) projectModal.style.display = 'none';
    });

    // Handle form submit
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('project-title').value.trim();
        //const color = document.getElementById('project-color').value;
        //const description = document.getElementById('project-desc').value.trim();

        if (!title) return;

        // Create new button for sidebar
        //const newBtn = document.createElement('button');
        //newBtn.classList.add('side-task-btn');
        //newBtn.dataset.projectId = Date.now(); // simple unique id
        //ewBtn.textContent = title;
        //newBtn.style.backgroundColor = color;
        //sideProjectsContainer.insertBefore(newBtn, addProjectButton);

        // Optionally save the project in your Projects list here

        const newProject = new Projects(title);
        renderProjectList();
        switchProjectsListener();
        renderMainSection();
        addNewTask();
        // Reset form and close modal
        projectForm.reset();
        projectModal.style.display = 'none';
    });

}