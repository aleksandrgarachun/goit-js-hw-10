import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const startBtn = document.querySelector("button[data-start]");

startBtn.disabled = true;


const infoDays = document.querySelector("span[data-days]");
const infoHours = document.querySelector("span[data-hours]");
const infoMinutes = document.querySelector("span[data-minutes]");
const infoSeconds = document.querySelector("span[data-seconds]");





const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0].getTime() > Date.now()) {
            userSelectedDate = selectedDates[0].getTime();
            startBtn.disabled = false;
        } else {
            iziToast.show({
                position: 'topRight',
                messageColor: '#FFF',
                messageSize: "16px",
                backgroundColor: '#EF4040',
                message: 'Please choose a date in the future operation',
                close: false,
            });
            
            startBtn.disabled = true;

        };
    }
  };

flatpickr("#datetime-picker", options);
  



startBtn.addEventListener("click", () => {
    const startInterval = setInterval(() => {
        startBtn.disabled = true;
        const currentTime = Date.now();
        const timeDiff = userSelectedDate - currentTime;
        const timeSolve = convertMs(timeDiff);
        if(timeDiff < 0) {
            clearInterval(startInterval);
        }else {
            infoDays.textContent = addLeadingZero(timeSolve.days);
            infoHours.textContent = addLeadingZero(timeSolve.hours);
            infoMinutes.textContent = addLeadingZero(timeSolve.minutes);
            infoSeconds.textContent = addLeadingZero(timeSolve.seconds);
        }
    }, 1000);
});





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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}



function addLeadingZero(value) {
    value = String(value);
    return value.String < 2 ? String(value).padStart(2, "0") : value;
    
    
}


