import { DUMMY_DATA } from './data.mjs';
import { SELECTORS } from './utils.mjs';

const constructSearchResultsListFragment = (searchResults) => {
	if (!searchResults.length) return null;

	const fragment = document.createDocumentFragment();
	const listWrapper = document.createElement('ul');
	for (const result of searchResults) {
		const item = document.createElement('li');
		item.classList.add('p-2', 'hover:bg-gray-700', 'cursor-pointer');
		item.textContent = result;
		listWrapper.append(item);
	}
	fragment.append(listWrapper);
	return fragment;
};

const updateSearchResults = (fragment) => {
	const searchResults = SELECTORS.getSearchResults();

	if (fragment) {
		searchResults.innerHTML = '';
		searchResults.append(fragment);
	} else {
		searchResults.textContent = 'No results to show';
	}
};

export const updateSearchInputValue = (value) => {
	SELECTORS.getSearchInput().value = value;
};

export const toggleSearchResults = (toOpen) => {
	const searchInput = SELECTORS.getSearchInput();
	const searchResults = SELECTORS.getSearchResults();
	if (toOpen && searchResults.classList.contains('hidden')) {
		searchInput.classList.remove('rounded-b-lg');
		searchResults.classList.remove('hidden');
		searchResults.classList.add('absolute');
	} else {
		searchInput.classList.add('rounded-b-lg');
		searchResults.classList.add('hidden');
		searchResults.classList.remove('absolute');
	}
};

export const autoCompleteSearch = (term) => {
	const relevantResults = DUMMY_DATA.filter((data) =>
		data.toLowerCase().includes(term.toLowerCase())
	);

	toggleSearchResults(!!term);
	updateSearchResults(constructSearchResultsListFragment(relevantResults));
};
