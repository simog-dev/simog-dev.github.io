const bulb = document.querySelector('.area');
const nightButton = document.querySelector('.bx-moon');
const dayButton = document.querySelector('.bx-sun');
// Aggiungi un evento di click al bottone notturno
nightButton.addEventListener('click', (event) => {
  document.documentElement.style.filter = 'invert(1)';
  event.target.classList.add('icon-active');
  dayButton.classList.remove('icon-active');
  bulb.style.transition = 'all 1s ease-in-out'; // Aggiungi una transizione per un movimento più fluido
  bulb.style.top = '0px'; // Sposta l'elemento bulb verso il basso di 100px
});
// Aggiungi un evento di click al bottone diurno
dayButton.addEventListener('click', (event) => {
  setTimeout(() => {
    document.documentElement.style.filter = 'invert(0)';
  }, 900);
  event.target.classList.add('icon-active');
  nightButton.classList.remove('icon-active');
  bulb.style.transition = 'all 1s ease-in-out'; // Aggiungi una transizione per un movimento più fluido
  bulb.style.top = '-400px'; // Sposta l'elemento bulb verso l'alto di 100px
});