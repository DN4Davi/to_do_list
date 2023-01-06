const task__input = document.querySelector(
  ".task-form__input"
) as HTMLInputElement;
const taskList = document.querySelector(".task-list");
const taskBase = document.querySelector(".task-base>.task");

function addListeners(task: HTMLElement) {
  const deleteButton = task.querySelector(".task__delete") as HTMLElement;
  deleteButton.addEventListener("click", (event) => {
    const deleter = event.currentTarget as HTMLElement;
    const toDelete = deleter.parentElement;
    toDelete && toDelete.addEventListener("animationend", (event) => {
      const deleted = event.currentTarget as HTMLElement;
      deleted.remove();
    });
    toDelete?.classList.add("task--removed");
  });

  const descriptionForm = task.querySelector(".task__description-form") as HTMLFormElement;
  descriptionForm.addEventListener("submit", (event)=> {
    event.preventDefault();
    const form = event.currentTarget as HTMLElement;
    const editButton = form.querySelector(".task__description-edit");
    editButton?.classList.toggle("task__description-edit--active");
    const description = form.querySelector(".task__description") as HTMLInputElement;
    description.disabled = !description.disabled;
    if(!description.disabled) description.focus();
  })

  const downButton = task.querySelector(".task__down") as HTMLElement;
  downButton.addEventListener("click", (event) => {
    const downer = event.currentTarget as HTMLElement;
    const task = downer.parentElement?.parentElement;
    if (task) task.nextElementSibling?.after(task);
  });

  const upButton = task.querySelector(".task__up") as HTMLElement;
  upButton.addEventListener("click", (event) => {
    const upper = event.currentTarget as HTMLElement;
    const task = upper.parentElement?.parentElement;
    if (task) task.previousElementSibling?.before(task);
  });

  const completeButton = task.querySelector(".task__complete") as HTMLElement;
  completeButton.addEventListener("click", (event) => {
    const completer = event.currentTarget as HTMLElement;
    const task = completer.parentElement?.parentElement;
    if (task) task.classList.toggle("task--completed");
    const completedTag = task?.querySelector(".task__completed");
    if (!completedTag) {
      const tag = document.createElement("span");
      tag.classList.add("task__completed");
      tag.innerText = "completed"
      task?.querySelector(".task__header")?.appendChild(tag);
    }
    
  });
}

function addTask() {
  const newTask = taskBase?.cloneNode(true) as HTMLElement | null;
  const taskName = task__input?.value;
  if (newTask) {
    const task__title = newTask.querySelector(".task__title") as HTMLElement;
    task__title.innerText = taskName;
    addListeners(newTask);
    taskList?.appendChild(newTask);
  }
  task__input.focus();
}

export default addTask;
