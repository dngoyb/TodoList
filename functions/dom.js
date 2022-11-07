/**
 *
 * @param {string} tagname
 * @param {object} attributes
 * @return {HTMLElement}
 */
export function createElement(tagname, attributes = {}) {
	const element = document.createElement(tagname);
	for (const [attribute, value] of Object.entries(attributes)) {
		if (value !== null) element.setAttribute(attribute, value);
	}

	return element;
}

/**
 *
 * @param {string} id
 * @returns {DocumentFragment}
 */
export function cloneTemplate(id) {
	return document.getElementById(id).content.cloneNode(true);
}
