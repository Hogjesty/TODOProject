import { TODOS_KEY } from "../constantes/constance.js";
import { Todo } from "../interfaces/todo.interface";

export function setTodoToLocalStorage(todos: Todo[]) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}