import { createElement } from '../utils.js';
import { editStatus } from '../storage.js';

// Создание новой задачи

const createTask = (index, textTask, listName) => {
	const task = createElement('li', ['tasks__item']);

	// Анимация появления новой задачи

	setTimeout(() => task.classList.add('tasks__item--show'), 400);

	// Номер в списке

	const number = createElement('span', ['tasks__number']);
	number.textContent = `${index + 1}.`;
	task.appendChild(number);

	// Создание текста

	const text = createElement('p', ['tasks__task']);
	text.textContent = textTask;
	task.appendChild(text);

	// Создание кнопки

	const label = createElement('label', ['tasks__label']);
	const checkbox = createElement('input', ['tasks__status'], 'type', 'checkbox', 'aria-label', 'Отметка о выполнении');
	label.appendChild(checkbox);
	task.appendChild(label);

	// Отслеживание отметки о выполнении задачи

	// checkbox.addEventListener('click', () => task.classList.toggle('tasks__item--complete'));

	checkbox.addEventListener('click', () => {
		task.classList.toggle('tasks__item--complete');
		editStatus(listName, textTask);
	});

	return task;
};

export { createTask	};