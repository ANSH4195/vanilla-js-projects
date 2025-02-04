const draggables = document.querySelectorAll('.draggable');
const dropareas = document.querySelectorAll('.droparea');

let draggedElement;

draggables.forEach((draggable) => {
	draggable.addEventListener('dragstart', (e) => {
		draggedElement = e.target;
		e.target.classList.add('opacity-50');
	});
	draggable.addEventListener('dragend', (e) => {
		draggedElement = undefined;
		e.target.classList.remove('opacity-50');
	});
});

dropareas.forEach((droparea) => {
	droparea.addEventListener('drop', (e) => {
		e.target.classList.remove('bg-gray-600');
		e.target.append(draggedElement);
		draggedElement = undefined;
	});
	droparea.addEventListener('dragenter', (e) => {
		console.log('I am');
		e.target.closest('.droparea').classList.add('bg-gray-600');
		// closestDroparea.classList.add('bg-gray-600');
		// targetDroparea = closestDroparea;
	});
	droparea.addEventListener('dragleave', (e) => {
		console.log('Why am I');
		e.target.closest('.droparea').classList.remove('bg-gray-600');
		// targetDroparea.classList.remove('bg-gray-600');
		// targetDroparea = undefined;
	});
	droparea.addEventListener('dragover', (e) => {
		e.preventDefault();
	});
});
