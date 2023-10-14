import { TODOS_KEY } from "../constantes/constance.js";
import { Todo } from "../interfaces/todo.interface";
import { createElementsWithStyles } from "./createElemetsWithStyles.js";
import { PaginationManager } from "./pagination.js";
import { setTodoToLocalStorage } from "./setTodoToLocalStorage.js";

export function createTaskElement(todoData: Todo, paginationManager: PaginationManager): HTMLDivElement {

    const [div, checkbox, deleteButton, todosTitle] = createElementsWithStyles(todoData);

    checkbox.addEventListener("click", event => {
        let todos = JSON.parse(`${localStorage.getItem(TODOS_KEY)}`) ?? [];
        todosTitle.style.textDecoration = todosTitle.style.textDecoration ? "" : "line-through";
        const todo: Todo = todos.find((todo: Todo) => todo.id === todoData.id) as Todo;
        todo.resolved = !todo.resolved;
        setTodoToLocalStorage(todos);
    });

    deleteButton.addEventListener("click", event => {
        let todos = JSON.parse(`${localStorage.getItem(TODOS_KEY)}`) ?? [];
        todos = todos.filter((todo: Todo) => todo.id !== todoData.id)
        setTodoToLocalStorage(todos);
        div.remove();
        paginationManager.changePaginationSize();
    });

    div.append(checkbox, todosTitle, deleteButton);

    return div;
}