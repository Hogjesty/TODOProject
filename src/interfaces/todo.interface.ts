export interface Todo {
    id: number;
    title: string;
    resolved: boolean;
}

export type HtmlElements = [HTMLDivElement, HTMLInputElement, HTMLButtonElement, HTMLParagraphElement];
//export type HtmlElements = HTMLDivElement | HTMLInputElement | HTMLButtonElement | HTMLParagraphElement;

export type Dots = {first: HTMLDivElement, second: HTMLDivElement};