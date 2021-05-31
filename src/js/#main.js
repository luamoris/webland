// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN

const data = require('../../content/data');
const Woks = require('./components/woks');
const DomHelper = require('./helpers/dom.helper');

// Menu
const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
if (isMobile) {
	document.body.classList.add('touch');
	const menuArrows = document.querySelectorAll('.menu__arrow');
	menuArrows.forEach((arrow, id, arr) => {
		arrow.addEventListener('click', () => {
			arr.forEach((item) => {
				if (arrow !== item) {
					item.classList.remove('active');
					item.parentElement.parentElement.classList.remove('menu_sub_open');
				}
			});
			arrow.classList.toggle('active');
			arrow.parentElement.parentElement.classList.toggle('menu_sub_open');
		});
	});
} else {
	document.body.classList.add('mouse');
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MENU BURGER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const menu = document.querySelector('.menu');
const links = menu.querySelectorAll('[class*="menu__link"]');
const btnBurger = document.getElementById('headerMenuBurger');

function burgerHandler() {
	document.body.classList.toggle('burger_open');
	btnBurger.classList.toggle('active');
	menu.classList.toggle('burger_open');
}

btnBurger.addEventListener('click', burgerHandler);
links.forEach((link) => {
	link.addEventListener('click', burgerHandler);
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GALLERY
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const gallery = document.querySelector('.gallery');
const pagination = document.querySelector('.pagination');
const works = new Woks(gallery, pagination, data.works);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INPUT TAGS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const form = document.querySelector('.form');
const searcher = form.querySelector('.searcher');
const searcherInput = searcher.querySelector('.searcher__input');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (searcherInput.value) {
		const tags = searcherInput.value.split(' ');
		works.applyFilterTags(tags);
		form.reset();
	} else {
		works.applyFilterTags();
	}
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SORTER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const sorter = document.querySelector('.sorter');
const sorterRadioButtons = sorter.querySelectorAll('input[name="date"]');
sorterRadioButtons.forEach((radio) => {
	radio.addEventListener('change', () => {
		const method = radio.value;
		works.applySorterDate(method);
	});
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FILTER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const categories = {};
const filter = document.querySelector('.filter');
const filterTopic = document.querySelector('.categories__topic');
const filterCheckboxes = filter.querySelectorAll('input[type="checkbox"]');
filterCheckboxes.forEach((checkbox) => {
	checkbox.addEventListener('change', () => {
		console.log(1);
		if (checkbox.checked) {
			categories[checkbox.value] = true;
		} else {
			delete categories[checkbox.value];
		}
		works.applyFilterCategories(Object.keys(categories));
	});
});

filterTopic.addEventListener('click', () => {
	filterTopic.classList.toggle('summary__open');
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SKILLS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function createItemSkills({ title, level }, color = 'blue') {
	const itemEl = DomHelper.createElement({ tagName: 'div', className: `skill__item skill__item_${color}` });
	const titleEl = DomHelper.createElement({ tagName: 'div', className: 'skill__item_title' });
	const progressEl = DomHelper.createElement({ tagName: 'div', className: 'skill__item_progress' });
	const valueEl = DomHelper.createElement({ tagName: 'div', className: 'skill__item_value' });

	titleEl.innerText = title;
	valueEl.style.width = `${level}%`;

	progressEl.append(valueEl);
	itemEl.append(titleEl, progressEl);
	return itemEl;
}

function createSkill({ charter, values = [] }, color = 'blue') {
	const skillEl = DomHelper.createElement({ tagName: 'div', className: 'skill' });
	const charterEl = DomHelper.createElement({ tagName: 'div', className: `skill__charter skill__charter_${color}` });
	const listEl = DomHelper.createElement({ tagName: 'div', className: 'skill__list' });

	charterEl.innerText = charter;
	values.forEach((value) => {
		const itemEl = createItemSkills(value, color);
		listEl.append(itemEl);
	});

	skillEl.append(charterEl, listEl);
	return skillEl;
}

const skillsElement = document.getElementById('skills');
const skillsContent = skillsElement.querySelector('.content');

let currentColor = 'blue';
data.skills.forEach((skill) => {
	const skillEl = createSkill(skill, currentColor);
	skillsContent.append(skillEl);
	currentColor = currentColor === 'blue' ? 'orange' : 'blue';
});
