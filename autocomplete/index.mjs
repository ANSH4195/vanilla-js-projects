import { SELECTORS, debouncedCallback } from './utils.mjs';
import {
	autoCompleteSearch,
	toggleSearchResults,
	updateSearchInputValue,
} from './autoComplete.mjs';

const baseHTML =
	'<div class="text-lg"><input id="search-input" type="text" placeholder="Go on, search something..." class="bg-gray-700 w-96 px-3 py-2 rounded-t-lg rounded-b-lg"/><!-- <input type="button" value="Search" /> --></div><div id="search-results" class="hidden w-96 max-h-96 z-10 border-2 border-gray-700 rounded-b-lg overflow-auto"></div>';

for (const wrapper of SELECTORS.getWrappers()) {
	wrapper.innerHTML = baseHTML;

	const debouncedSearch = debouncedCallback(autoCompleteSearch, 300);
	wrapper.addEventListener('input', (e) => debouncedSearch(e.target.value));
	wrapper.addEventListener('click', (e) => {
		const closestId = e.target.closest('[id]').getAttribute('id');
		switch (closestId) {
			case 'search-results':
				updateSearchInputValue(e.target.textContent);
				toggleSearchResults(false);
				break;
		}
	});
}
