import { fetchJSON } from './functions/api.js';
import { createElement } from './functions/dom.js';

try {
	const todos = await fetchJSON(
		'https://jsonplaceholder.typicode.com/posts?_limit=5'
	);
} catch (error) {
	createElement('div', {
		class: 'alert alert-danger',
		role: 'alert',
	});
}
