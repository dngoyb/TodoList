import { createElement, cloneTemplate } from '../functions/dom.js';
/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

export class TodoList {
	/**@type {Todo[]} */
	#todos = [];

	/**@type {HTMLUListElement} */
	#listElement = [];
	constructor(todos) {
		/**
		 * @param {Todo[]} todos
		 */
		this.#todos = todos;
	}

	/**
	 *
	 * @param {HTMLElement} element
	 */
	appendTo(element) {
		element.append(cloneTemplate('todolist-layout'));

		this.#listElement = element.querySelector('.list-group');
		for (const todo of this.#todos) {
			const t = new TodoListItem(todo);
			this.#listElement.append(t.element);
		}
		element
			.querySelector('form')
			.addEventListener('submit', (e) => this.#onSubmit(e));

		element.querySelectorAll('.btn-group button').forEach((button) => {
			button.addEventListener('click', (e) => this.#toggleFilter(e));
		});

		this.#listElement.addEventListener('delete', ({ detail: todo }) => {
			this.#todos = this.#todos.filter((t) => t !== todo);
			console.log(this.#todos);
		});
		this.#listElement.addEventListener('toggle', ({ detail: todo }) => {
			todo.completed = !todo.completed;
			console.log(this.#todos);
		});
	}

	/**
	 *
	 * @param {SubmitEvent} e
	 */

	#onSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const title = new FormData(form).get('title').toString().trim();
		if (title === '') {
			return;
		}
		const todo = {
			id: Date.now(),
			title,
			completed: false,
		};

		const item = new TodoListItem(todo);
		this.#listElement.prepend(item.element);
		form.reset();
	}

	/**
	 *
	 * @param {PointerEvent} e
	 */

	#toggleFilter(e) {
		e.preventDefault();
		const filter = e.currentTarget.getAttribute('data-filter');
		e.currentTarget.parentElement
			.querySelector('.active')
			.classList.remove('active');
		e.currentTarget.classList.add('active');
		if (filter === 'todo') {
			this.#listElement.classList.add('hide-completed');
			this.#listElement.classList.remove('hide-todo');
		} else if (filter === 'done') {
			this.#listElement.classList.add('hide-todo');
			this.#listElement.classList.remove('hide-completed');
		} else {
			this.#listElement.classList.remove('hide-todo');
			this.#listElement.classList.remove('hide-completed');
		}
	}
}

class TodoListItem {
	#element;
	#todo;
	/**
	 *
	 * @type {Todo} todo
	 */
	constructor(todo) {
		const id = `todo-${todo.id}`;
		this.#todo = todo;
		const li = cloneTemplate('todolist-item').firstElementChild;

		this.#element = li;
		const checkbox = li.querySelector('input');
		checkbox.setAttribute('id', id);
		if (todo.completed) checkbox.setAttribute('checked', '');

		const label = li.querySelector('label');
		label.setAttribute('for', id);
		label.innerText = todo.title;

		const button = li.querySelector('button');
		this.toggle(checkbox);

		button.addEventListener('click', (e) => this.removeTodo(e));
		checkbox.addEventListener('change', (e) => this.toggle(e.currentTarget));

		this.#element.addEventListener('delete', (e) => {});
	}
	/**
	 *
	 * @return {HTMLElement}
	 */
	get element() {
		return this.#element;
	}

	/**
	 *
	 * @param {PointerEvent} e
	 */
	removeTodo(e) {
		e.preventDefault();
		const event = new CustomEvent('delete', {
			detail: this.#todo,
			bubbles: true,
			cancelable: true,
		});
		this.#element.dispatchEvent(event);
		if (event.defaultPrevented) {
			return;
		}
		this.#element.remove();
	}

	/**
	 *
	 * @param {HTMLInputElement} checkbox
	 */
	toggle(checkbox) {
		if (checkbox.checked) {
			this.#element.classList.add('is-completed');
		} else {
			this.#element.classList.remove('is-completed');
		}
		const event = new CustomEvent('toggle', {
			detail: this.#todo,
			bubbles: true,
		});
		this.#element.dispatchEvent(event);
	}
}
