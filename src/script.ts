import { createTaskElement } from "./components/createTaskElement.js";
import { pagination } from "./components/pagination.js";
import { setTodoToLocalStorage } from "./components/setTodoToLocalStorage.js";
import { TODOS_KEY } from "./constantes/constance.js";
import { Todo } from "./interfaces/todo.interface";

const todosContainer = document.querySelector<HTMLDivElement>(".todos-container");
const todosInput = document.querySelector<HTMLInputElement>(".todo-input");
const addNewTodoButton = document.querySelector<HTMLButtonElement>(".btn");
const paginationContainer = document.querySelector<HTMLDivElement>(".pagination");

let todos = JSON.parse(`${localStorage.getItem(TODOS_KEY)}`) ?? [];
todos.forEach((todoData: Todo) => {
    todosContainer?.append(createTaskElement(todoData));
});

pagination(paginationContainer);

addNewTodoButton?.addEventListener("click", event => {
    const text = todosInput?.value;

    if (!text) {
        return;
    }

    const newTodo: Todo = {
        id: new Date().getMilliseconds(),
        title: text,
        resolved: false
    };

    todosContainer?.append(createTaskElement(newTodo));

    setTodoToLocalStorage(todos = [...todos, newTodo]);
    pagination(document.querySelector<HTMLDivElement>(".pagination"));
});





