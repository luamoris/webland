// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN

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

// MENU BURGER
const btnBurger = document.getElementById('headerMenuBurger');
btnBurger.addEventListener('click', () => {
	document.body.classList.toggle('burger_open');
	btnBurger.classList.toggle('active');
	btnBurger.parentElement.classList.toggle('burger_open');
});
