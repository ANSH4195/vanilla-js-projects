export const debouncedCallback = (callback, time) => {
	let currentCallback;
	return function (...args) {
		if (currentCallback) {
			clearTimeout(currentCallback);
		}
		currentCallback = setTimeout(() => callback.call(this, ...args), time);
	};
};

export const SELECTORS = {
	getSearchInput: () => document.getElementById('search-input'),
	getSearchResults: () => document.getElementById('search-results'),
	getWrappers: () => document.querySelectorAll('.auto-complete-wrapper'),
};
