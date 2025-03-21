import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const todosContainer = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter");

const handleDeleteTodo = (completed) => {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
};

const handleCheckedTodo = (checked) => {
  if (checked) {
    todoCounter.updateCompleted(true);
  } else {
    todoCounter.updateCompleted(false);
  }
};

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleDeleteTodo,
    handleCheckedTodo
  );
  const todoElement = todo.getView();
  return todoElement;
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    return todo;
  },
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formValues) => {
    const todoData = {
      name: formValues.name,
      date: formValues.date,
      id: uuidv4(),
      completed: false,
    };
    const todoElement = generateTodo(todoData);
    todoSection.addItem(todoElement);
    todoCounter.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

todoSection.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
