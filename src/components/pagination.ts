import { TODOS_KEY } from "../constantes/constance.js";

export function pagination(parentNode: HTMLDivElement | null): void {
    if (!parentNode) {
        return;
    }

    let todos = JSON.parse(`${localStorage.getItem(TODOS_KEY)}`) ?? [];
    parentNode.innerHTML = "";
    parentNode.append(...createPageArray(todos.length, 5));
}

function createPageArray(dataLength: number, offset: number): Array<HTMLDivElement> {

    const countOfPages = Math.ceil(dataLength / offset);

    const pages: Array<HTMLDivElement> = [];
    for (let i = 0; i < countOfPages; i++) {
        const div = document.createElement("div");
        div.classList.add("page");
        div.textContent = `${i + 1}`;
        pages.push(div);
    }
    return pages;
}