const lazyImgs = document.querySelectorAll('img[data-src]');
const loadMap = document.querySelector('._load-map');
const loadMore = document.querySelector('._load-more');
const winHeight = document.documentElement.clientHeight;

const lazyImgsPosition = [];

// ====================================================================================== FUNCTIONS

async function getContent() {
	if (!document.querySelector('._loading-icon')) {
		loadMore.insertAdjacentHTML('beforeend',
			`<div class="_loading-icon"></div>`);
	}
	loadMore.classList.add('_loading');
	const res = await fetch('../content/more.html', { method: 'GET' });
	if (res.ok) {
		const result = await res.text();
		loadMore.insertAdjacentHTML('beforeend', result);
		loadMore.classList.remove('_loading');
		document.querySelector('._loading-icon') && document.querySelector('._loading-icon').remove();
	} else {
		console.warn('Error');
	}
}

function lazyScrollCheck() {
	const imgIndex = lazyImgsPosition.findIndex((el) => window.pageYOffset > el - winHeight);
	if (imgIndex >= 0) {
		if (lazyImgs[imgIndex].dataset.src) {
			lazyImgs[imgIndex].src = lazyImgs[imgIndex].dataset.src;
			lazyImgs[imgIndex].removeAttribute('data-src');
		}
		delete lazyImgsPosition[imgIndex];
	}
}

function getMap() {
	const loadMapPosition = loadMap.getBoundingClientRect().top + window.pageYOffset;
	if (window.pageYOffset > loadMapPosition - winHeight) {
		const loadMaoUrl = loadMap.dataset.map;
		if (loadMaoUrl) {
			loadMap.querySelector('.map__body').insertAdjacentHTML('beforeend',
				`<iframe src="${loadMaoUrl}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`);
			loadMap.classList.add('_loaded');
		}
	}
}

function loadMoreContent() {
	const loadMorePosition = loadMore.getBoundingClientRect().top + window.pageYOffset;
	const loadMoreHeight = loadMore.offsetHeight;
	if (window.pageYOffset > (loadMorePosition + loadMoreHeight) - winHeight) {
		getContent();
	}
}

function lazyScroll() {
	document.querySelectorAll('img[data-src]').length > 0 && lazyScrollCheck();
	!loadMap.classList.contains('_loaded') && getMap();
	!loadMore.classList.contains('_loading') && loadMoreContent();
}

// ====================================================================================== CODE

if (lazyImgs.length > 0) {
	lazyImgs.forEach((img) => {
		if (img.dataset.src) {
			lazyImgsPosition.push(img.getBoundingClientRect().top + window.pageYOffset);
			lazyScrollCheck();
		}
	});
}

// ====================================================================================== EVENT

window.addEventListener('scroll', lazyScroll);
