

window.onscroll = function() {scrollProgress()};

function scrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progress").style.width = scrolled + "%";
}

const body = document.querySelector("body");
const burger = document.querySelector("#burger");
const headerMenu = document.querySelector(".header__menu");
burger.onclick = () => {
	burger.classList.toggle('active');
	headerMenu.classList.toggle('active');
	body.classList.toggle('lock');
};
