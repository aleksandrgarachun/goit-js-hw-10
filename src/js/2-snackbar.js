import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const delayInput = form.querySelector('input[name="delay"]');
const stateInput = form.querySelector('input[name="state"]');



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = delayInput.value;
    const state = stateInput.checked ? "fulfilled" : "rejected";

    delayInput.value = "";

    makeRequest(delay, state)
    .then(() => {
        iziToast.show({
            position: 'topRight',
            messageColor: '#FFF',
            messageSize: "16px",
            backgroundColor: '#59A10D',
            close: false, 
            title: '✅ OK',
            titleColor: '#FFF',
            message: ` Fulfilled promise in ${delay}ms`,
        });
    })
    .catch(() => {
        iziToast.show({
            position: 'topRight',
            messageColor: '#FFF',
            messageSize: "16px",
            backgroundColor: '#EF4040',
            close: false,
            title: '❌ Error',
            titleColor: '#FFF',
            message: `Rejected promise in ${delay}ms`,
        });
    });
   
});

      const makeRequest = (delay, state) =>  {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(state === "fulfilled") {
                    resolve(delay);
                    
                } else {
                    reject(delay);
                }
            }, delay);
        })
    
    };

