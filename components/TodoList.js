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

				<ul class="list-group">
					<li class="todo list-group-item d-flex align-items-center">
						<input class="form-check-input" type="checkbox" id="todo-1" />
						<label class="ms-2 form-check-label" for="todo-1"> Todo 1 </label>
						<label class="ms-auto btn btn-danger btn-sm">
							<i class="bi-trash"> </i>
						</label>
					</li>
				</ul>
			</main>
        `;
	}
}
