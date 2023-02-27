import { TodoList } from './componebts/TodoList.js';
import { fetchJson } from './Functions/api.js';
import { myCreateElement } from './Functions/dom.js';

try {
	// const todos = await fetchJson(
	// 	'https://jsonplaceholder.typicode.com/todos?_limit=5'
	// );
	const todosInStorage = localStorage.getItem('todos')?.toString();
	let todos = [];
	if (todosInStorage) {
		todos = JSON.parse(todosInStorage);
	}
	const list = new TodoList(todos);
	list.appendTo(document.querySelector('#todolist'));
} catch (error) {
	const alertElement = myCreateElement('div', {
		class: 'alert alert-danger m-2',
		role: 'alert',
	});

	alertElement.innerText = 'Impossible to load the elements';
	document.body.prepend(alertElement);
	console.log(error);
}
