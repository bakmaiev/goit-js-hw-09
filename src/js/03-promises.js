'use strict';
import Notiflix from 'notiflix';

const elements = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

elements.form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  let delayValue = Number(elements.delay.value);
  let stepValue = Number(elements.step.value);
  let amountValue = Number(elements.amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delayValue += stepValue;
  };
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  })
}