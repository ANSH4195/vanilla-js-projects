import { SDK } from './sdk.mjs';

const sdk = new SDK();
let count = 0;

document.addEventListener('click', (e) => {
	if (e.target.id === 'log') {
		count += 1;
		sdk.logEvent(`Event #${count}`);
	}
	if (e.target.id === 'send') {
		sdk.send();
	}
});
