function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

buttonStart.addEventListener('click', startChangeColor);
buttonStop.addEventListener('click', stopChangeColor);
let intervalStart;

function startChangeColor() {
  intervalStart = setInterval(() => {
    buttonStart.setAttribute('disabled', '');
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function stopChangeColor() {
  clearInterval(intervalStart);
  buttonStart.removeAttribute('disabled');
}
