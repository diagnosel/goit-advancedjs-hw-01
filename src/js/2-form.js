const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formData = { email: '', message: '' };
const storedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};

formData.email = storedFormData.email ?? '';
formData.message = storedFormData.message ?? '';
form.elements.email.value = formData.email;
form.elements.message.value = formData.message;

form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);

function handleFormInput(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(formData, { email: '', message: '' });
  form.reset();
}
