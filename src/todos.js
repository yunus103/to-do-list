import { Projects } from "./projects";

export class ToDos {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;
        this.project = Projects.currentProjectId;

        Projects.projectList.find(p => p.projectId === Projects.currentProjectId).addToList(this);
    }

    toggleCompleted() {
        this.isCompleted = !this.isCompleted;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }

}