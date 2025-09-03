export class Projects {
    static projectList = [];
    static currentProjectId = -1;

    static #idCount = 1;

    constructor(projectTitle) {
        this.projectTitle = projectTitle;
        this.taskList = [];

        //Change this after localStorage
        this.projectId = Projects.#idCount++;

        Projects.projectList.push(this);
        Projects.currentProjectId = this.projectId;
    }

    addToList(todo) {
        this.taskList.push(todo);
    }

    deleteFromList(todo) {
        this.taskList = this.taskList.filter(item => item !== todo);
    }

    deleteProject() {
        Projects.projectList = Projects.projectList.filter(p => p !== this);
    }
}