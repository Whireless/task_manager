import { body } from './utils.js';
import { createTaskBlock } from './create/createList.js';
import { createTask } from './create/createTask.js';

const storage = localStorage;

// Запись нового списка в память

const createObjectList = (listName) => {
	const tasksArr = [];
	storage.setItem(listName, JSON.stringify(tasksArr));

	return;
};

// Удаление списка из памяти

const deleteObjectList = (listName) => storage.removeItem(listName);

// Запись новой задачи в список

const setTask = (listName, task) => {
	const list = storage.getItem(listName);
	const newList = JSON.parse(list);
	newList.push(task);
	storage.setItem(listName, JSON.stringify(newList));

	return;
};

// Смена статуса задачи в памяти

const editStatus = (listName, text) => {
	const list = storage.getItem(listName);
	const tasks = JSON.parse(list);
	// console.log(tasks);
	tasks.forEach(task => {
		if (task.text === text) task.status ? task.status = false : task.status = true;
	});

	storage.setItem(listName, JSON.stringify(tasks));

	return;
};

// Проверка и отображение списков из памяти

window.addEventListener('load', () => {
	Object.keys(storage).forEach(key => {
		const block = createTaskBlock(key, true);

		JSON.parse(storage.getItem(key)).forEach((item, i) => {
			const task = createTask(i, item.text, key);
			if (item.status) {
				task.classList.add('tasks__item--complete');
				task.querySelector('.tasks__status').checked = true;
			}

			block.querySelector('.tasks__list').appendChild(task);
		});
	});
});

export { createObjectList, deleteObjectList, setTask, editStatus };