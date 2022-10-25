import { createElement } from '../functions/dom.js';
/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

export class TodoList {
	/**@type {Todo[]} */
	#todos = [];
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
		element.innerHTML = `
            <form class="d-flex pb-4">
				<input
					required=""
					class="form-control"
					type="text"
					placeholder="Acheter des patates..."
					name="title"
					data-com.bitwarden.browser.user-edited="yes"
				/>
				<button class="btn btn-primary">Add</button>
			</form>
			<main>
				<div class="btn-group mb-4" role="group">
					<button
						type="button"
						class="btn btn-outline-primary active"
						data-filter="all"
					>
						All
					</button>
					<button
						type="button"
						class="btn btn-outline-primary"
						data-filter="todo"
					>
						Incomplete
					</button>
					<button
						type="button"
						class="btn btn-outline-primary"
						data-filter="done"
					>
						Complete
					</button>
				</div>

				<ul class="list-group"></ul>
			</main>
        `;

		const list = element.querySelector('.list-group');
		for (const todo of this.#todos) {
			const t = new TodoListItem(todo);
			t.appendTo(list);
		}
	}
}

class TodoListItem {
	#element;
	/**
	 *
	 * @type {Todo} todo
	 */
	constructor(todo) {
		const id = `todo-${todo.id}`;
		const li = createElement('li', {
			class: 'todo list-group-item d-flex align-items-center',
		});

		const checkbox = createElement('input', {
			type: 'checkbox',
			class: 'form-check-input',
			id,
			checked: todo.completed ? '' : null,
		});

		const label = createElement('label', {
			class: 'ms-2 form-check-label',
			for: id,
		});
		label.innerText = todo.title;

		const button = createElement('button', {
			class: 'ms-auto btn btn-danger btn-sm',
		});
		button.innerHTML = '<i class="bi-trash"> </i>';

		li.append(checkbox);
		li.append(label);
		li.append(button);
		button.addEventListener('click', (e) => this.removeTodo(e));
		this.#element = li;
	}
	/**
	 *
	 * @param {HTMLElement} element
	 */
	appendTo(element) {
		element.append(this.#element);
	}

	/**
	 *
	 * @param {PointerEvent} e
	 */
	removeTodo(e) {
		e.preventDefault();
		this.#element.remove();
	}
}
