const TODOS_KEY = "todos";

const todosContainer = document.querySelector<HTMLDivElement>(".todos-container");
const todosInput = document.querySelector<HTMLInputElement>(".todo-input");

let todos = JSON.parse(`${localStorage.getItem(TODOS_KEY)}`) ?? [];

todos.forEach((todoData: Todo) => {
    todosContainer?.append(createTask(todoData));
});

const addNewTodoButton = document.querySelector<HTMLButtonElement>(".btn");
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

    todosContainer?.append(createTask(newTodo));


    localStorage.setItem(TODOS_KEY, JSON.stringify(todos = [...todos, newTodo]));
});


function createTask(todoData: Todo): HTMLDivElement {
    const div = document.createElement("div");
    div.setAttribute("class", "todo-container");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todoData.resolved;

    const todosTitle = document.createElement("p");
    todosTitle.textContent = todoData.title;
    todosTitle.style.textDecoration = todoData.resolved ? "line-through" : "";

    checkbox.addEventListener("click", event => {
        todosTitle.style.textDecoration = todosTitle.style.textDecoration ? "" : "line-through";
        const todo: Todo = todos.find((todo: Todo) => todo.id === todoData.id);
        todo.resolved = !todo.resolved;
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    });

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-btn");
    deleteButton.addEventListener("click", event => {
        todos = todos.filter((todo: Todo) => todo.id !== todoData.id);
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
        div.remove();
    });

    div.append(checkbox, todosTitle, deleteButton);

    return div;
}

interface Todo {
    id: number;
    title: string;
    resolved: boolean;
}