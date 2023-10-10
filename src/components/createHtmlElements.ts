import { HtmlElements } from "../interfaces/todo.interface";

export function createHtmlElements(): HtmlElements {
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    const deleteButton = document.createElement("button");
    const todosTitle = document.createElement("p");

    return [div, checkbox, deleteButton, todosTitle];
}