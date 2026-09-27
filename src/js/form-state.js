export function updateFormData(formData, { name, value }) {
  formData[name] = value.trim();
}

export function parseStoredFormData(value) {
  if (!value) {
    return { email: '', message: '' };
  }

  try {
    const storedData = JSON.parse(value);

    return {
      email: typeof storedData.email === 'string' ? storedData.email : '',
      message: typeof storedData.message === 'string' ? storedData.message : '',
    };
  } catch {
    return { email: '', message: '' };
  }
}

export function isFormDataComplete({ email, message }) {
  return Boolean(email.trim() && message.trim());
}
