import { OFFSET, TODOS_KEY } from "../constantes/constance.js";
import { Dots } from "../interfaces/todo.interface.js";

export class PaginationManager {

    private parentNode: HTMLDivElement;
    private currentPosition: number = 1;
    private pages: Array<HTMLDivElement>;

    private dots: Dots = { first: this.createDotsElement(), second: this.createDotsElement() };

    constructor(parentNode: HTMLDivElement) {
        this.parentNode = parentNode;
        this.pages = this.initPages();
        this.redrawPages(this.currentPosition);
    }

    public changePaginationSize(): void {
        this.pages = this.initPages();
        this.currentPosition -= this.currentPosition > this.pages.length ? 1 : 0;
        this.currentPosition = this.currentPosition ? 1 : this.currentPosition;

        this.redrawPages(this.currentPosition);
    }

    public redrawPages(position: number): void {
        this.parentNode.innerHTML = "";

        if (!this.pages.length) {
            return;
        }

        this.currentPosition = position;

        let currentIndex = position - 1;

        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].className = '';
            this.pages[i].classList.add("page");
            this.pages[i].textContent = `${i + 1}`;

            if (i !== 0 && i !== this.pages.length - 1 && // це не перша і не остання сторінка
                i !== currentIndex - 2 && i !== currentIndex - 1 && // це не дві сторінки перед поточною
                i !== currentIndex && i !== currentIndex + 1 && i !== currentIndex + 2) { // це не поточна сторінка і не дві після неї
                this.pages[i].classList.add("hidden-page");
            }
        }

        this.dots.first.style.display = currentIndex > 3 ? "flex" : "none";
        this.dots.second.style.display = currentIndex < this.pages.length - 4 ? "flex" : "none";

        this.pages[currentIndex].classList.add("selected-page");

        const newPages = this.pages.slice();
        newPages.splice(1, 0, this.dots.first);
        newPages.splice(-2, 0, this.dots.second);

        this.parentNode.append(...newPages);
    }

    private initPages(): Array<HTMLDivElement> {
        let todos = JSON.parse(`${localStorage.getItem(TODOS_KEY)}`) ?? [];

        const countOfPages = Math.ceil(todos.length / OFFSET);
        const pages: Array<HTMLDivElement> = [];

        for (let page = 1; page <= countOfPages; page++) {
            pages.push(this.createPageDiv(`${page}`));
        }

        return pages;
    }

    private createPageDiv(text: string): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("page");
        div.textContent = text;
        return div;
    }

    private createDotsElement(): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("dots");
        div.style.display = "none";
        div.textContent = "...";
        return div;
    }
}