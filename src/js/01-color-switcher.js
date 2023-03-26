'use strict';
const BACKGROUND_COLOR_DELAY = 1000;
let intervalId = null;

const elements = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

elements.stopBtn.disabled = true;

const handleStartBtn = () => {
    changeBackgroundColor();

    intervalId = setInterval(() => {
        changeBackgroundColor();
    }, BACKGROUND_COLOR_DELAY);

    switchBtns();
}
elements.startBtn.addEventListener('click', handleStartBtn);

const handleStopBtn = () => {
    clearInterval(intervalId);

    switchBtns();
}
elements.stopBtn.addEventListener('click', handleStopBtn);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function changeBackgroundColor() {
    elements.body.style.backgroundColor = getRandomHexColor();
};

function switchBtns() {
    elements.startBtn.disabled = !elements.startBtn.disabled;
    elements.stopBtn.disabled = !elements.stopBtn.disabled;
}
