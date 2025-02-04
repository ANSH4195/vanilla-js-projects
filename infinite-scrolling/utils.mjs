export const useDebouncedCallback = (callback, duration = 300) => {
	let currentTimeout;
	return (...args) => {
		if (currentTimeout) {
			clearTimeout(currentTimeout);
			currentTimeout = null;
		}
		currentTimeout = setTimeout(() => callback(...args), duration);
	};
};
