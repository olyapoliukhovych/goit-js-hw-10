import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const delayValue = Number(form.elements.delay.value);
  const stateValue = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });

  promise
    .then(delayValue => {
      iziToast.success({
        title: '',
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        timeout: 5000,
        position: 'topRight',
        icon: '',
        closeOnClick: true,
        closeOnEscape: true,
      });
    })
    .catch(delayValue => {
      iziToast.error({
        title: '',
        message: `❌ Rejected promise in ${delayValue}ms`,
        timeout: 5000,
        position: 'topRight',
        icon: '',
        closeOnClick: true,
        closeOnEscape: true,
      });
    });
}
