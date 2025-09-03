import "./styles.css";
import { ToDos } from "./todos.js";
import { Projects } from "./projects.js";
import { renderProjectList, renderMainSection } from "./dom/render.js";
import { addNewTask, addProjectListener, expandTaskDetails, switchProjectsListener } from "./dom/listener.js";





renderProjectList();
renderMainSection();


expandTaskDetails();
addNewTask();
switchProjectsListener();
addProjectListener();