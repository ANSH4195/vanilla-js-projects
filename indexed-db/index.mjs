import { Database } from './database.mjs';
import { useDragDrop } from './useDragDrop.mjs';
import { createTaskCard, KanbanTypes } from './utils.mjs';

const { setupDraggedElement } = useDragDrop();
const db = new Database((value) => {
	const taskCard = createTaskCard(value);
	setupDraggedElement(taskCard);
	todoArea.append(taskCard);
});

const todoArea = document.querySelector('#kanban-todo .dropzone');
const taskInput = document.getElementById('task');

const successCallback = () => alert('succeeded');
const errorCallback = () => alert('error');

const appendTask = () => {
	const inputValue = taskInput.value;
	taskInput.value = '';
	const task = { name: inputValue, type: KanbanTypes.TODO };

	db.addTask(task, successCallback, errorCallback);
	const taskCard = createTaskCard(task);
	setupDraggedElement(taskCard);
	todoArea.append(taskCard);
};

document.body.addEventListener('click', (event) => {
	const closestId = event.target.closest('[id]')?.getAttribute('id');

	switch (closestId) {
		case 'add-task':
			appendTask();
			break;
		case 'delete-task':
			// Button aint have this iD.
			break;
		default:
			break;
	}
});
