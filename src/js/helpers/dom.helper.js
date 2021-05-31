// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DOM HELPER

class DomHelper {
	// Create Dom Element
	static createElement({ tagName, className, attributes = {} }) {
		const element = document.createElement(tagName);
		if (className) {
			const classNames = className.split(' ').filter(Boolean);
			element.classList.add(...classNames);
		}
		Object
			.keys(attributes)
			.forEach((key) => element.setAttribute(key, attributes[key]));
		return element;
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = DomHelper;
