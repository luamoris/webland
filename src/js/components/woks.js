// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ WOKS

const DomHelper = require('../helpers/dom.helper');
const {
	sorting,
	filterCategories,
	filterTags,
} = require('../process');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HELPER FUNCTIONS

function createWorkCard(work) {
	const cardEl = DomHelper.createElement({
		tagName: 'div',
		className: 'card',
		attributes: {
			'data-id': work.id,
		},
	});
	const cardPictureEl = DomHelper.createElement({ tagName: 'div', className: 'card__picture' });
	const cardImgEl = DomHelper.createElement({
		tagName: 'img',
		className: 'card__picture_img',
		attributes: {
			src: work.img || './img/gallery/default.svg',
			alt: work.title,
		},
	});
	const linkEl = DomHelper.createElement({
		tagName: 'a',
		className: 'card__title',
		attributes: {
			href: work.link,
			target: '_blanck',
		},
	});

	linkEl.innerText = work.title;
	cardPictureEl.append(cardImgEl);
	cardEl.append(cardPictureEl, linkEl);

	return cardEl;
}

function createPaginationItem(value, current = false) {
	const opt = {
		tagName: 'div',
		className: 'pagination__item pagination__item_number',
		attributes: {
			'data-value': value,
		},
	};

	if (current) {
		opt.className += ' _current';
	}

	const item = DomHelper.createElement(opt);
	item.innerText = value;
	return item;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ WOKS

class Woks {
	// Pagination calculator
	static calculator(page) {
		page.end = Math.ceil(page.length / page.max) || 1;
		page.remainder = page.length % page.max;
	}

	constructor(gallery, pagination, works) {
		this.filter = false;
		this.gallery = gallery;
		this.works = sorting(works, 'desc');
		this.worksFiltered = null;
		this.page = {
			length: works.length,
			max: 6,
			start: 1,
			end: 1,
			current: 1,
			remainder: 0,
		};
		this.left = pagination.querySelector('.pagination__item_arrow-left');
		this.right = pagination.querySelector('.pagination__item_arrow-right');
		this.numbers = pagination.querySelector('.numbers');
		Woks.calculator(this.page);
		this.getPage(this.page.start);
	}

	getPage(number) {
		const start = (number - 1) * this.page.max;
		let cards = null;
		if (this.filter) {
			cards = this.worksFiltered.slice(start, start + this.page.max);
		} else {
			cards = this.works.slice(start, start + this.page.max);
		}
		while (this.gallery.firstChild) {
			this.gallery.firstChild.remove();
		}
		cards.forEach((card) => {
			const cardEl = createWorkCard(card);
			this.gallery.append(cardEl);
		});
		this.updatePagination(number);
	}

	updatePagination(current) {
		while (this.numbers.firstChild) {
			this.numbers.firstChild.remove();
		}

		const add = (number, isCurrent = false) => {
			const item = createPaginationItem(number, isCurrent);
			item.addEventListener('click', () => this.getPage(number));
			this.numbers.append(item);
		};

		this.left.dataset.value = this.page.start;
		this.right.dataset.value = this.page.end;

		this.left.addEventListener('click', () => this.getPage(this.page.start));
		this.right.addEventListener('click', () => this.getPage(this.page.end));

		if (current === this.page.start) {
			this.left.classList.add('_current');
		} else {
			this.left.classList.remove('_current');
		}

		if (current === this.page.end) {
			this.right.classList.add('_current');
		} else {
			this.right.classList.remove('_current');
		}

		if (current - 2 >= 1) {
			add(current - 2);
		}

		if (current - 1 >= 1) {
			add(current - 1);
		}

		add(current, true);

		if (current + 1 <= this.page.end) {
			add(current + 1);
		}

		if (current + 2 <= this.page.end) {
			add(current + 2);
		}
	}

	applySorterDate(method) {
		if (this.filter) {
			this.worksFiltered = sorting(this.worksFiltered, method);
			this.getPage(this.page.start);
		} else {
			this.works = sorting(this.works, method);
			this.getPage(this.page.start);
		}
	}

	applyFilter(isFiltered, fun, data) {
		if (isFiltered) {
			this.filter = true;
			this.worksFiltered = fun(this.works, data);
			this.page.length = this.worksFiltered.length;
			Woks.calculator(this.page);
		} else {
			this.filter = false;
			this.worksFiltered = null;
			this.page.length = this.works.length;
			Woks.calculator(this.page);
		}
		this.getPage(this.page.start);
	}

	applyFilterCategories(categories = []) {
		this.applyFilter(categories.length, filterCategories, categories);
	}

	applyFilterTags(tags = []) {
		this.applyFilter(tags.length, filterTags, tags);
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = Woks;
