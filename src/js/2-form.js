let formData = {
  email: '',
  message: '',
};

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const feedbackForm = document.querySelector('.feedback-form');

saveFormState();

feedbackForm.addEventListener('input', onInput);
feedbackForm.addEventListener('submit', onSubmit);

function onInput(event) {
  if (
    event.target.nodeName !== 'INPUT' &&
    event.target.nodeName !== 'TEXTAREA'
  ) {
    return;
  }

  formData[event.target.name] = event.target.value.trim();

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(LOCAL_STORAGE_KEY);
  formData = { email: '', message: '' };
  feedbackForm.reset();
}

function saveFormState() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!savedData) return;

  try {
    const parsed = JSON.parse(savedData);

    if (typeof parsed === 'object' && parsed !== null) {
      formData = parsed;

      feedbackForm.elements.email.value = parsed.email || '';
      feedbackForm.elements.message.value = parsed.message || '';
    }
  } catch (error) {
    console.log('Error name:', error.name, 'Error message:', error.message);
  }
}
