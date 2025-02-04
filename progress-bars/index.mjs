import { addProgressBar } from "./progressUtils.mjs";

export const DURATION = 10;

const getProgressDuration = () =>
	document.getElementById("progress-duration").value;

document
	.getElementById("add-progress-bar")
	.addEventListener("click", () => addProgressBar(getProgressDuration()));
