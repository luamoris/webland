// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PROCESS

const dateCompare = (date1, date2) => {
	const d1 = Date.parse(date1);
	const d2 = Date.parse(date2);
	return d1 > 0 ? (d2 > 0 ? ((d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0)) : 1)
		: (d2 > 0 ? -1 : ((d1 > d2) ? 1 : ((d2 > d1) ? -1 : 0)));
};

function sorting(works, method) {
	return works.sort((current, next) => method === 'asc'
		? dateCompare(current.date, next.date) : dateCompare(next.date, current.date));
}

function filterCategories(works, categories = []) {
	return works.filter((work) => categories.includes(work.category));
}

function filterTags(works, tags = []) {
	return works.filter((work) => {
		let isFiltered = false;
		work.tags.forEach((tag) => {
			if (tags.includes(tag)) {
				isFiltered = true;
			}
		});
		return isFiltered;
	});
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = {
	sorting,
	filterCategories,
	filterTags,
};
