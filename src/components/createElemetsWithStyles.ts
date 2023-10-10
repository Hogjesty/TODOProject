import { Todo } from "../interfaces/todo.interface";
import { HtmlElements } from "../interfaces/todo.interface";
import { createHtmlElements } from "./createHtmlElements.js";

export function createElementsWithStyles(todoData: Todo): HtmlElements {
    const [div, checkbox, deleteButton, todosTitle] = createHtmlElements();
    div.setAttribute("class", "todo-container");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todoData.resolved;
    todosTitle.textContent = todoData.title;
    todosTitle.style.textDecoration = todoData.resolved ? "line-through" : "";
    deleteButton.setAttribute("class", "delete-btn");

    return [div, checkbox, deleteButton, todosTitle];
}