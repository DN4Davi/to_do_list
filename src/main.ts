import "./styles/index.scss";
import addTask from "./addTask";

const taskForm__add = document.querySelector(".task-form");

taskForm__add?.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
})
