import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('button[data-start]');
const timePicker = document.getElementById('datetime-picker');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

let formatDate = null;
let deltaTime = null;
let timerId = null;

flatpickr(timePicker, options);
buttonStart.addEventListener('click', startTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart('2', '0');
}

function startTimer() {
  timerId = setInterval(() => {}, 1000);
}

function updateTimerface(formatDate) {
  days.textContent = formatDate.days;
  hours.textContent = formatDate.hours;
  minutes.textContent = formatDate.minutes;
  seconds.textContent = formatDate.seconds;
}
