export const KanbanTypes = {
	TODO: 'todo',
	IN_PROGRESS: 'inprogress',
	COMPLETED: 'completed',
	DROPPED: 'dropped',
};

const createDeleteButton = () => {
	const button = document.createElement('button');
	button.classList.add(
		'delete-button',
		'px-3',
		'bg-red-500',
		'text-lg',
		'rounded-xl',
		'float-right',
		'h-full',
		'hover:bg-red-600',
		'active:bg-red-700',
		'transition-all'
	);
	button.textContent = 'D';
	return button;
};

export const createTaskCard = (task) => {
	const card = document.createElement('div');
	card.classList.add('bg-gray-700', 'rounded-xl', 'p-2', 'my-2');
	card.setAttribute('draggable', 'true');
	card.setAttribute('key', task.id);
	card.textContent = task.name;
	card.append(createDeleteButton());
	return card;
};
