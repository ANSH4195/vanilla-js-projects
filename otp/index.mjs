const inputContainer = document.getElementById("input-container");
const OTPInputs = inputContainer.children;

requestAnimationFrame(() => {
	OTPInputs[0].focus();
});

inputContainer.addEventListener("paste", (e) => {
	e.preventDefault();
	const clipboardData = e.clipboardData;
	const pastedData = clipboardData.getData("text");
	if (Number(pastedData)) {
		const splitData = pastedData.split("");

		let i = 0;
		for (i = 0; i < splitData.length; i++) {
			OTPInputs[i].value = splitData[i];
		}
		if (i < OTPInputs.length) {
			OTPInputs[i].focus();
		} else {
			OTPInputs[i - 1].focus();
		}
	}
});

inputContainer.addEventListener("keydown", (e) => {
	if (e.key === "-") {
		e.preventDefault();
		return;
	}
	if (e.key === "Backspace" || e.key === "Delete") {
		e.preventDefault();
		e.target.value = "";
		e.target.previousElementSibling?.focus();
	}
	if (e.target.value) {
		e.target.value = "";
	}
});

inputContainer.addEventListener("input", (e) => {
	if (e.target.nextElementSibling) {
		e.target.nextElementSibling.focus();
	} else {
		e.target.blur();
	}
});
