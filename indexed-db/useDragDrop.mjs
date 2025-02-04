export function useDragDrop() {
	let draggedElement = null;

	document.querySelectorAll('.dropzone').forEach((dropzone) => {
		dropzone.addEventListener('dragenter', (event) => {
			const closestDropzone = event.target.closest('.dropzone');
			console.log('ENTER', event.target, closestDropzone);
			closestDropzone.classList.add('bg-gray-900');
		});

		dropzone.addEventListener('dragleave', (event) => {
			console.log('LEAVE', event.target);
			if (event.target.classList.contains('dropzone')) {
				event.target.classList.remove('bg-gray-900');
			}
		});

		dropzone.addEventListener('dragover', (event) => {
			event.preventDefault();
		});

		dropzone.addEventListener('drop', (event) => {
			const closestDropzone = event.target.closest('.dropzone');
			closestDropzone.classList.remove('bg-gray-900');
			if (draggedElement) {
				closestDropzone.append(draggedElement);
			}
		});
	});

	function setupDraggedElement(element) {
		element.addEventListener('dragstart', (event) => {
			draggedElement = event.target;
			event.target.classList.add('opacity-75');
		});

		element.addEventListener('dragend', (event) => {
			draggedElement = null;
			event.target.classList.remove('opacity-75');
		});
	}

	return {
		setupDraggedElement,
	};
}
