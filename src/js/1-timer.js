import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import '../css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const resetButton = document.querySelector('[data-reset]');

startButton.disabled = true;
input.disabled = false;

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDay = selectedDates[0];

    if (pickedDay <= Date.now()) {
      startButton.disabled = true;

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        closeOnClick: true,
        closeOnEscape: true,
        progressBarColor: 'red',
        displayMode: 2,
        icon: '',
        iconUrl: 'confused.svg',
      });

      return;
    }

    userSelectedDate = pickedDay;
    startButton.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateClock({ days, hours, minutes, seconds }) {
  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const difference = userSelectedDate - Date.now();

    if (difference <= 0) {
      clearInterval(timerId);
      updateClock({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      input.disabled = false;
      return;
    }

    const time = convertMs(difference);
    updateClock(time);
  }, 1000);
});

resetButton.addEventListener('click', onReset);

function onReset() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';

  startButton.disabled = true;
  input.disabled = false;
}

let shownHint = false;

resetButton.addEventListener('mouseenter', () => {
  if (shownHint) return;

  iziToast.info({
    title: 'Congrats!',
    message: 'You have found the secret button!',
    position: 'topRight',
    timeout: 7000,
    closeOnClick: true,
    closeOnEscape: true,
    displayMode: 1,
    icon: '',
    iconUrl: 'gift.svg',
  });

  // shownHint = true;
});

resetButton.addEventListener('mouseleave', () => {
  if (shownHint) return;

  iziToast.info({
    title: '',
    message: 'Have a nice day!',
    position: 'topRight',
    timeout: 5000,
    closeOnClick: true,
    closeOnEscape: true,
    displayMode: 1,
    icon: '',
    iconUrl: 'heart.svg',
  });

  shownHint = true;
});
