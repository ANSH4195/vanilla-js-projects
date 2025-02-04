const progressBars = document.getElementById('progress-bars');

// Singular

// Can be separated into 2 functions to optimize DOM updates
// const updateProgress = (timeRemaining, multiplier) => {
// 	progressFill.style.transform = `translateX(${
// 		100 - timeRemaining * (100 / multiplier)
// 	}%)`;
// };

// function startStopwatch(time) {
// 	let initialTime = performance.now();

// 	function startTicking() {
// 		// performance.now() gives in miliseconds, hence converting it into seconds
// 		const value = (performance.now() - initialTime) / 1000;
// 		updateProgress(time - value, time);
// 		value < time && requestAnimationFrame(startTicking);
// 	}

// 	requestAnimationFrame(startTicking);
// }

// startStopwatch(100);

// Multiple
class Progressor {
	#progressFillDuration = undefined;
	#progressBar = undefined;
	#progressBarFill = undefined;

	constructor(duration = 100) {
		this.#progressFillDuration = duration;
		[this.#progressBar, this.#progressBarFill] = this.#createProgressBar();
		this.#appendProgressBar();
		this.#startProgress();
	}

	#createProgressBar() {
		const progressBar = document.createElement('div');
		progressBar.classList.add(
			'w-96',
			'h-4',
			'bg-gray-700',
			'rounded-xl',
			'overflow-hidden',
			'my-3'
		);
		const progressBarFill = document.createElement('div');
		progressBarFill.classList.add(
			'bg-gradient-to-r',
			'from-sky-500',
			'to-indigo-500',
			'h-full',
			'relative',
			'rounded-xl'
		);
		progressBar.append(progressBarFill);
		return [progressBar, progressBarFill];
	}

	#appendProgressBar() {
		progressBars.append(this.#progressBar);
	}

	#startProgress() {
		let initialTime = performance.now();
		requestAnimationFrame(() => this.#tick(initialTime));
	}

	#tick(initialTime) {
		const timeElapsed = (performance.now() - initialTime) / 1000;
		this.#updateProgressBar(timeElapsed);
		timeElapsed < this.#progressFillDuration &&
			requestAnimationFrame(() => this.#tick(initialTime));
	}

	#updateProgressBar(timeElapsed) {
		// timeElapsed is X percent of duration, hence X = (100*tE)/duration
		const percentElapsed = (100 * timeElapsed) / this.#progressFillDuration;
		this.#progressBarFill.style.transform = `translateX(-${
			100 - percentElapsed
		}%)`;
	}
}

document
	.getElementById('add-progress-bar')
	.addEventListener('click', () => new Progressor(5));
