import { ToDos } from "./todos";

export class Projects {
    static projectList = [];
    static currentProjectId = -1;
    static #idCount = 1;

    constructor(projectTitle) {
        this.projectTitle = projectTitle;
        this.taskList = [];

        this.projectId = Projects.#idCount++; // assign unique ID

        Projects.projectList.push(this);
        Projects.currentProjectId = this.projectId;

        this.saveToLocalStorage(); // sync to localStorage
    }

    addToList(todo) {
        this.taskList.push(todo);
        this.saveToLocalStorage();
    }

    deleteFromList(todo) {
        this.taskList = this.taskList.filter(item => item !== todo);
        this.saveToLocalStorage();
    }

    deleteProject() {
        Projects.projectList = Projects.projectList.filter(p => p !== this);
        if (Projects.currentProjectId === this.projectId) {
            Projects.currentProjectId = Projects.projectList[0]?.projectId || -1;
        }
        this.saveToLocalStorage();
    }

    // ---------------------
    // LocalStorage methods
    // ---------------------
    saveToLocalStorage() {
        localStorage.setItem("projects", JSON.stringify(Projects.projectList));
        localStorage.setItem("currentProjectId", Projects.currentProjectId);
    }

    static loadFromLocalStorage() {
        const savedProjects = localStorage.getItem("projects");
        const savedCurrentId = localStorage.getItem("currentProjectId");

        if (savedProjects) {
            const parsedProjects = JSON.parse(savedProjects);

            Projects.projectList = parsedProjects.map(p => {
                const proj = new Projects(p.projectTitle);
                proj.projectId = p.projectId;
                proj.taskList = p.taskList.map(t => {
                    const todo = new ToDos(t.title, t.description, t.dueDate, t.priority);
                    todo.isCompleted = t.isCompleted;
                    todo.project = t.project;
                    return todo;
                });
                return proj;
            });

            // Fix #idCount to continue after the highest ID
            const maxId = Math.max(...Projects.projectList.map(p => p.projectId));
            Projects.#idCount = maxId + 1;
        }

        if (savedCurrentId) {
            Projects.currentProjectId = Number(savedCurrentId);
        }
    }
}
