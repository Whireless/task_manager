// Общая переменная

const body = document.querySelector('body');

// Создание HTML-элемента

const createElement = (tag, classOne, attrOne, attrOneDesc, attrTwo, attrTwoDesc) => {
	const element = document.createElement(tag);
	element.classList.add(...classOne);

	if (attrOne) element.setAttribute(`${attrOne}`, `${attrOneDesc}`);
	if (attrTwo) element.setAttribute(`${attrTwo}`, `${attrTwoDesc}`);

	return element;
};

// Отслеживание нажатия 'Enter'

const isKeyEvt = (evt) => evt.key === 'Enter';

// Проверка на соответствие кол-ву символов 

const symbolLenght = (input) => input.value.length >= 4 ? true : input.focus();

export { body, createElement, isKeyEvt, symbolLenght };
