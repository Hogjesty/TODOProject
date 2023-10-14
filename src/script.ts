import { createTaskElement } from "./components/createTaskElement.js";
import { PaginationManager } from "./components/pagination.js";
import { setTodoToLocalStorage } from "./components/setTodoToLocalStorage.js";
import { TODOS_KEY } from "./constantes/constance.js";
import { Todo } from "./interfaces/todo.interface";

const todosContainer = document.querySelector<HTMLDivElement>(".todos-container");
const todosInput = document.querySelector<HTMLInputElement>(".todo-input");
const addNewTodoButton = document.querySelector<HTMLButtonElement>(".btn");
const paginationContainer = document.querySelector<HTMLDivElement>(".pagination");

const paginationManager = new PaginationManager(paginationContainer ?? document.createElement("div"));

let todos = JSON.parse(`${localStorage.getItem(TODOS_KEY)}`) ?? [];
todos.forEach((todoData: Todo) => {
    todosContainer?.append(createTaskElement(todoData, paginationManager));
});

paginationContainer?.addEventListener("click", event => {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.classList.contains("page")) {
        return;
    }

    paginationManager.redrawPages(parseInt(clickedElement.innerText));
});

addNewTodoButton?.addEventListener("click", event => {
    const text = todosInput?.value;
    let todosLocal = JSON.parse(`${localStorage.getItem(TODOS_KEY)}`) ?? [];
    if (!text) {
        return;
    }

    const newTodo: Todo = {
        id: new Date().getMilliseconds(),
        title: text,
        resolved: false
    };

    todosContainer?.append(createTaskElement(newTodo, paginationManager));

    setTodoToLocalStorage(todos = [...todosLocal, newTodo]);

    paginationManager.changePaginationSize();
});





