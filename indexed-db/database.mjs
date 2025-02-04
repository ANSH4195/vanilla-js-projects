export const OBJECT_STORE_NAME = 'tasks';

export class Database {
	#dbInstance = undefined;

	#performOperation(operation, task, onSuccess, onError) {
		const addRequest = this.#dbInstance
			.transaction(OBJECT_STORE_NAME, 'readwrite')
			.objectStore(OBJECT_STORE_NAME)
			[operation](task);
		addRequest.onsuccess = onSuccess;
		addRequest.onerror = onError;
	}

	#loadPreviousTasks(onSuccess) {
		const transaction = this.#dbInstance.transaction(
			OBJECT_STORE_NAME,
			'readonly'
		);
		const cursorRequest = transaction
			.objectStore(OBJECT_STORE_NAME)
			.openCursor();
		cursorRequest.onsuccess = (event) => {
			const cursor = event.target.result;
			if (cursor) {
				onSuccess(cursor.value);
				cursor.continue();
			}
		};
	}

	constructor(onPreviousTaskLoadSuccess) {
		const instance = indexedDB.open('kanban');
		instance.onerror = (event) => {
			console.error('Something went wrong!', event.target);
		};
		instance.onupgradeneeded = (event) => {
			this.#dbInstance = event.target.result;
			this.#dbInstance.createObjectStore(OBJECT_STORE_NAME, {
				keyPath: 'id',
				autoIncrement: true,
			});
		};
		instance.onsuccess = (event) => {
			this.#dbInstance = event.target.result;
			this.#loadPreviousTasks(onPreviousTaskLoadSuccess);
		};
	}

	addTask(task, onSuccess, onError) {
		this.#performOperation('add', task, onSuccess, onError);
	}

	deleteTask(task, onSuccess, onError) {
		this.#performOperation('delete', task, onSuccess, onError);
	}

	updateTask(task, onSuccess, onError) {
		this.#performOperation('put', task, onSuccess, onError);
	}
}
