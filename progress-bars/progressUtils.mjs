import { DURATION } from "./index.mjs";

const progressBarsArea = document.getElementById("progress-bars");

const createProgressBarBackdrop = () => {
	const div = document.createElement("div");
	div.classList.add("h-4", "w-72", "bg-gray-700", "rounded-full", "my-3");
	return div;
};

const createProgressOverlay = () => {
	const div = document.createElement("div");
	div.classList.add(
		"h-full",
		"bg-gray-400",
		"rounded-full",
		"overflow-x-hidden",
	);
	div.style.width = "0%";
	return div;
};

const animateProgressOverlay = (
	progressOverlay,
	perFrameFillPercent,
	width = 0,
) => {
	let currentWidth = width;
	requestAnimationFrame(() => {
		currentWidth += perFrameFillPercent;
		progressOverlay.style.width = `${currentWidth}%`;
		if (currentWidth < 100) {
			animateProgressOverlay(
				progressOverlay,
				perFrameFillPercent,
				currentWidth,
			);
		}
	});
};

const startProgress = (progressBar, duration) => {
	const progressOverlay = createProgressOverlay();
	progressBar.append(progressOverlay);
	const perSecondFillPercent = 100 / duration;
	const perFrameFillPercent = perSecondFillPercent / 60;
	animateProgressOverlay(progressOverlay, perFrameFillPercent);
};

export const addProgressBar = (duration) => {
	const progressBar = createProgressBarBackdrop();
	progressBarsArea.append(progressBar);
	startProgress(progressBar, duration || DURATION);
};
