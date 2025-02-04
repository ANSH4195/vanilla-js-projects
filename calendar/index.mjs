import { CONFLICTING_DATA, NON_CONFLICTING_DATA } from './data.mjs';

(function appendTimes() {
	const timesContainer = document.getElementById('times');
	const timesFragment = document.createDocumentFragment();
	for (let i = 0; i < 24; i++) {
		const currentTime = `${i.toString().padStart(2, '0')}:00`;
		const currentTimeElement = document.createElement('p');
		currentTimeElement.textContent = currentTime;
		timesFragment.append(currentTimeElement);
	}
	timesContainer.append(timesFragment);
})();

(function appendTimeDividers() {
	const timeLineContainer = document.getElementById('timeline');
	const timeLineFragment = document.createDocumentFragment();
	for (let i = 0; i < 24; i++) {
		const currentTimeElement = document.createElement('hr');
		currentTimeElement.classList.add('border-gray-700');
		timeLineFragment.append(currentTimeElement);
	}
	timeLineContainer.append(timeLineFragment);
})();

// <div class="bg-red-800 rounded-md p-1 border border-white-50">TeamDevkode</div>;

function elementCreator({ tagName, classList, textContent }) {
	const element = document.createElement(tagName);
	if (classList) element.classList.add(...classList);
	if (textContent) element.textContent = textContent;
	return element;
}

function getRowCoordinates(startTime, endTime) {
	const [startTimeHrs, startTimeMins] = startTime
		.split(':')
		.map((cmp) => parseInt(cmp));
	const [endTimeHrs, endTimeMins] = endTime
		.split(':')
		.map((cmp) => parseInt(cmp));

	const rowStart = startTimeHrs * 2 + 1 + (startTimeMins === 30 ? 1 : 0);
	const rowEnd = endTimeHrs * 2 + 1 + (endTimeMins === 30 ? 1 : 0);
	return [rowStart, rowEnd];
}

function createMeetingCard({ title, startTime, endTime, color }) {
	const [rowStart, rowEnd] = getRowCoordinates(startTime, endTime);

	const titleElement = elementCreator({
		tagName: 'p',
		classList: ['text-xl'],
		textContent: title,
	});

	const dateElement = elementCreator({
		tagName: 'p',
		textContent: `${startTime} - ${endTime}`,
	});

	const meetingCard = elementCreator({
		tagName: 'div',
		classList: [
			'rounded-md',
			'py-2',
			'px-4',
			`row-start-[${rowStart}]`,
			`row-end-[${rowEnd}]`,
			`bg-[${color}]`,
			'border-2',
			'border-white-50',
		],
	});
	meetingCard.append(titleElement, dateElement);

	return meetingCard;
}

function appendMeetings() {
	const meetingsContainer = document.getElementById('meetings');
	const meetingsFragment = document.createDocumentFragment();
	CONFLICTING_DATA.forEach((meeting) => {
		const card = createMeetingCard(meeting);
		meetingsFragment.append(card);
	});
	meetingsContainer.append(meetingsFragment);
}

appendMeetings();
