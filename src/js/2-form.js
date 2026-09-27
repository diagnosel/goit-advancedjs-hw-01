import {
  isFormDataComplete,
  parseStoredFormData,
  updateFormData,
} from './form-state.js';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formData = { email: '', message: '' };
const storedFormData = parseStoredFormData(localStorage.getItem(STORAGE_KEY));

Object.assign(formData, storedFormData);
form.elements.email.value = formData.email;
form.elements.message.value = formData.message;

form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);

function handleFormInput(event) {
  updateFormData(formData, event.target);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!isFormDataComplete(formData)) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(formData, { email: '', message: '' });
  form.reset();
}
