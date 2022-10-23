/**
 *
 * @param {string} tagname
 * @param {object} attributes
 * @return {HTMLElement}
 */
export function createElement(tagname, attributes = {}) {
	const element = document.createElement(tagname);
	for (const [attribute, value] of Object.entries(attributes)) {
		element.setAttribute(attribute, value);
	}

	return element;
}
