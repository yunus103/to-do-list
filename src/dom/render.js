import { Projects } from "../projects";
import { addProjectListener } from "./listener";

export function renderProjectList() {
    const sideProjectsContainer = document.querySelector('.side-projects');
    sideProjectsContainer.innerHTML = `
            <h3>Projects</h3>
            <div class="side-project-buttons">
                <button class="side-task-btn" id="add-project">+ Add Project</button>
            </div>`;

    Projects.projectList.forEach(item => {
        const projectListItem = document.createElement('div');
        projectListItem.classList.add('side-project-buttons');

        const projectBtn = document.createElement('button');
        projectBtn.dataset.projectId = item.projectId;
        projectBtn.classList.add('side-task-btn');
        projectBtn.textContent = item.projectTitle;

        projectListItem.append(projectBtn);
        sideProjectsContainer.append(projectListItem);
    });
    addProjectListener();
}

export function renderMainSection() {
    const projectName = document.getElementById('project-name');
    const currentProject = Projects.projectList.find(p => p.projectId === Projects.currentProjectId);
    projectName.textContent = currentProject.projectTitle;


    const ul = document.getElementById("task-items");

    ul.innerHTML = currentProject.taskList.map((task, index) => `
    <li class="task-item">
        <div class="task-main">
        <div>
            <input 
            type="checkbox" 
            id="task-${index}" 
            name="task-${index}" 
            ${task.isCompleted ? "checked" : ""}>
            <label for="task-${index}">${task.title}</label>
        </div>
        <p class="due-date">${task.dueDate}</p>
        </div>

        <div class="task-details">
        <form>
            <div class="form-group">
            <label for="title-${index}">Title</label>
            <input type="text" id="title-${index}" name="title" value="${task.title}">
            </div>

            <div class="form-group">
            <label for="desc-${index}">Description</label>
            <textarea id="desc-${index}" name="description" rows="3" placeholder="Enter task details...">${task.description}</textarea>
            </div>

            <div class="form-group">
            <label for="due-${index}">Due Date</label>
            <input type="date" id="due-${index}" name="dueDate" value="${task.dueDate}">
            </div>

            <div class="form-group">
            <label for="priority-${index}">Priority</label>
            <select id="priority-${index}" name="priority">
                <option value="low" ${task.priority === "low" ? "selected" : ""}>Low</option>
                <option value="medium" ${task.priority === "medium" ? "selected" : ""}>Medium</option>
                <option value="high" ${task.priority === "high" ? "selected" : ""}>High</option>
            </select>
            </div>
        </form>
        </div>
    </li>
    `).join("");
}