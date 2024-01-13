import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const delayInput = form.querySelector('input[name="delay"]');



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = delayInput.value;
    const state = form.state.value;

    form.reset();


    createDelayedPromise(delay, state)
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

      const createDelayedPromise = (delay, state) =>  {
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

