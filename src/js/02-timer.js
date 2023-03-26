'use strict';

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const TIMER_DELAY = 1000;
const STORAGE_KEY = 'selected date';
const elements = {
    input: document.querySelector('#datetime-picker'),
    btn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
          elements.btn.disabled = true;
          Notiflix.Notify.failure('Please choose a date in the future!');
      } else {
          elements.btn.disabled = !elements.btn.disabled;
          localStorage.setItem(STORAGE_KEY, selectedDates[0].getTime())
      }
  },
};
const timer = {
    start() {
        setInterval(() => {
            const selectedTime = localStorage.getItem(STORAGE_KEY);
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            if (deltaTime < 0) return;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            elements.days.textContent = `${days}`;
            elements.hours.textContent = `${hours}`;
            elements.minutes.textContent = `${minutes}`;
            elements.seconds.textContent = `${seconds}`;
        }, TIMER_DELAY)
    }
};

elements.btn.disabled = true;

flatpickr("#datetime-picker", options);
elements.btn.addEventListener('click', handleStartBtn)

function handleStartBtn() {
    timer.start();
    elements.btn.disabled = !elements.btn.disabled;
    elements.input.disabled = !elements.input.disabled;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}