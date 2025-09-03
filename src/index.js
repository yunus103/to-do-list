import "./styles.css";
import { ToDos } from "./todos.js";
import { Projects } from "./projects.js";
import { renderProjectList, renderMainSection } from "./dom/render.js";
import { addNewTask, expandTaskDetails } from "./dom/listener.js";


const groceryProject = new Projects("Groceries");



const todo1 = new ToDos('Yunus', 'aaa', 122, "high");
const todo2 = new ToDos('Emre', 'aaa', 122, "high");
const todo3 = new ToDos('Aytekin', 'aaa', 122, "high");




//console.table(groceryProject.taskList);

//groceryProject.deleteFromList(todo3);

//console.table(groceryProject.taskList);

//groceryProject.deleteProject();

//console.log(Projects.projectList);



renderProjectList();
renderMainSection();


expandTaskDetails();
addNewTask();