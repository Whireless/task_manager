import { body, createElement, isKeyEvt, symbolLenght } from '../utils.js';
import { createTask } from './createTask.js';
import { createObjectList, deleteObjectList, setTask } from '../storage.js';

const input = body.querySelector('.manage__input');
const addList = body.querySelector('.manage__button--add');

// Создание нового списка задач

const createTaskBlock = (listName, onLoad) => {
	const allLists = body.querySelector('.tasks__all-lists');

	// Проверка количества списков

	let allBlocks = allLists.children.length + 1;

	if (allBlocks === 5) {
		input.disabled = true;
		addList.disabled = true;
	}

	const block = createElement('article', ['tasks__block']);

	// Анимация появления списков

	setTimeout(() => block.classList.add('tasks__block--active'), 250);

	// Заголовок списка

	const title = createElement('h2', ['tasks__title'], 'contentEditable', '');
	title.textContent = listName;
	block.appendChild(title);

	// Сохранение в памяти название списка (ключа)

	if (!onLoad) createObjectList(listName);

	// Блок управления задачами

	const manage = createElement('div', ['tasks__manage']);
	block.appendChild(manage);

	// Поле создания задачи

	const create = createElement('input', ['tasks__input'], 'placeholder', 'Название задачи', 'maxlength', '40');
	manage.appendChild(create);

	// Кнопка добавления задачи

	const add = createElement('button', ['tasks__button', 'tasks__button--add'], 'type', 'button');
	manage.appendChild(add);

	// Добавление новой задачи в список

	add.addEventListener('click', () => {
		if (symbolLenght(create)) {
			const task = createTask(list.querySelectorAll('.tasks__item').length, create.value, listName);
			list.appendChild(task);
			const taskObj = { text: create.value, status: false, };
			setTask(title.textContent, taskObj);
			// setTask(title.textContent, create.value);
			create.value = '';
		}
	});

	// Поле ввода новой задачи в списке

	create.addEventListener('keydown', (evt) => {
		if (isKeyEvt(evt) && symbolLenght(create)) {
			evt.preventDefault();
			const task = createTask(list.querySelectorAll('.tasks__item').length, create.value);
			list.appendChild(task);
			const taskObj = { text: create.value, status: false, };
			setTask(title.textContent, taskObj);
			// setTask(title.textContent, create.value);
			create.value = '';
		}
	});

	// Создание списка

	const list = createElement('ul', ['tasks__list']);
	block.appendChild(list);

	// Кнопка удаления списка

	const clear = createElement('button', ['tasks__button', 'tasks__button--clear'], 'type', 'button');
	clear.textContent = 'Удалить список';
	block.appendChild(clear);

	clear.addEventListener('click', () => {
		const popup = body.querySelector('.popup--no-clear');
		popup.querySelector('.popup__text').textContent = `Удалить список "${listName}"?`;

		// Предупреждение об очистке списка

		popup.classList.add('popup--active');

		// Согласие

		popup.querySelector('.popup__button--yes').addEventListener('click', () => {
			popup.classList.remove('popup--active');
			block.classList.remove('tasks__block--active');
			setTimeout(() => allLists.removeChild(block), 500);
			allBlocks - 1;
			deleteObjectList(title.textContent);

			if (allBlocks < 6) {
				input.disabled = false;
				addList.disabled = false;
			}
		});

		// Отмена

		popup.querySelector('.popup__button--no').addEventListener('click', () => popup.classList.remove('popup--active'));
	});

	input.value = '';
	return allLists.appendChild(block);
};

// Инициализация списка по кнопке 'Enter'

input.addEventListener('keydown', (evt) => {
	if (isKeyEvt(evt) && symbolLenght(input)) {
		evt.preventDefault();
		createTaskBlock(input.value);
	}
});

// Инициализация списка по встроенной кнопке

addList.addEventListener('click', () => symbolLenght(input) ? createTaskBlock(input.value) : false);

export { createTaskBlock };