const bulb = document.querySelector('.area');
const nightButton = document.querySelector('.bx-moon');
const dayButton = document.querySelector('.bx-sun');

nightButton.addEventListener('click', (event) => {
  document.documentElement.style.filter = 'invert(1)';
  event.target.classList.add('icon-active');
  dayButton.classList.remove('icon-active');
  bulb.style.transition = 'all 1s ease-in-out'; 
  bulb.style.top = '0px'; 
});
// Aggiungi un evento di click al bottone diurno
dayButton.addEventListener('click', (event) => {
  setTimeout(() => {
    document.documentElement.style.filter = 'invert(0)';
  }, 900);
  event.target.classList.add('icon-active');
  nightButton.classList.remove('icon-active');
  bulb.style.transition = 'all 1s ease-in-out'; 
  bulb.style.top = '-500px';
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  const newColorScheme = event.matches ? nightButton.click() : dayButton.click();
});
