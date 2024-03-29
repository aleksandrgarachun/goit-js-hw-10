import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let startInterval;

const startBtn = document.querySelector("button[data-start]");

startBtn.disabled = true;


const infoDays = document.querySelector("span[data-days]");
const infoHours = document.querySelector("span[data-hours]");
const infoMinutes = document.querySelector("span[data-minutes]");
const infoSeconds = document.querySelector("span[data-seconds]");



const iziToastConfig = {
    position: 'topRight',
    messageColor: '#FFF',
    messageSize: "16px",
    close: false,
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0].getTime() > Date.now()) {
            userSelectedDate = selectedDates[0].getTime();
            startBtn.disabled = false;
            clearInterval(startInterval);
        } else {
            iziToast.show({
                ...iziToastConfig,
                backgroundColor: '#EF4040',
                message: 'Please choose a date in the future operation',
            });
            
            startBtn.disabled = true;

        };
    }
  };

flatpickr("#datetime-picker", options);
  

startBtn.addEventListener("click", startCountdown);

function startCountdown () {
  startInterval = setInterval(updateTime, 1000);
}

function updateTime() {
  startBtn.disabled = true;
  const currentTime = Date.now();
  const timeDiff = userSelectedDate - currentTime;
  const timeSolve = convertMs(timeDiff);
  if(timeDiff < 0) {
      clearInterval(startInterval);
  } else {
      infoDays.textContent = addLeadingZero(timeSolve.days);
      infoHours.textContent = addLeadingZero(timeSolve.hours);
      infoMinutes.textContent = addLeadingZero(timeSolve.minutes);
      infoSeconds.textContent = addLeadingZero(timeSolve.seconds);
  }  
}






function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }



function addLeadingZero(value) {
    value = String(value);

    return value.length < 2 ? value.padStart(2, "0") : value;
    
}


