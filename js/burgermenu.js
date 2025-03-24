const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('header nav ul');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
});
