import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
    currentDeltaTime(selectedDates[0]);
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

function currentDeltaTime(selectedDates) {
  const currentDate = Date.now();
  if (selectedDates < currentDate) {
    buttonStart.setAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
  }
  deltaTime = selectedDates.getTime() - currentDate;
  formatDate = convertMs(deltaTime);
  updateTimerface(formatDate);
  buttonStart.removeAttribute('disabled');
}

function startTimer() {
  timerId = setInterval(() => {
    buttonStart.setAttribute('disabled', true);
    timePicker.setAttribute('disabled', true);

    deltaTime -= 1000;

    if (seconds.textContent <= 0 && minutes.textContent <= 0) {
      clearInterval(timerId);
    } else {
      formatDate = convertMs(deltaTime);
      updateTimerface(formatDate);
    }
  }, 1000);
}

function updateTimerface(formatDate) {
  days.textContent = formatDate.days;
  hours.textContent = formatDate.hours;
  minutes.textContent = formatDate.minutes;
  seconds.textContent = formatDate.seconds;
}
