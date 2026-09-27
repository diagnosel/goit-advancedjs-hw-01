import assert from 'node:assert/strict';
import test from 'node:test';

async function loadModule(relativePath) {
  try {
    return await import(new URL(relativePath, import.meta.url));
  } catch {
    return {};
  }
}

test('gallery markup links previews to original images and keeps descriptions', async () => {
  const { createGalleryMarkup } = await loadModule(
    '../src/js/gallery-markup.js'
  );

  assert.equal(typeof createGalleryMarkup, 'function');

  const markup = createGalleryMarkup([
    {
      preview: 'preview.jpg',
      original: 'original.jpg',
      description: 'Mountain lake',
    },
  ]);

  assert.equal(
    markup,
    '<li class="gallery-item"><a class="gallery-link" href="original.jpg"><img class="gallery-image" src="preview.jpg" alt="Mountain lake"></a></li>'
  );
});

test('gallery lightbox dependency exports a constructor', async () => {
  const { default: SimpleLightbox } = await loadModule('../src/js/lightbox.js');

  assert.equal(typeof SimpleLightbox, 'function');
});

test('form input trims the changed value and keeps the other field', async () => {
  const { updateFormData } = await loadModule('../src/js/form-state.js');

  assert.equal(typeof updateFormData, 'function');

  const formData = {
    email: 'student@example.com',
    message: 'Saved message',
  };

  updateFormData(formData, { name: 'email', value: '  new@example.com  ' });

  assert.deepEqual(formData, {
    email: 'new@example.com',
    message: 'Saved message',
  });
});

test('restored form data always has email and message strings', async () => {
  const { parseStoredFormData } = await loadModule('../src/js/form-state.js');

  assert.equal(typeof parseStoredFormData, 'function');
  assert.deepEqual(parseStoredFormData(null), { email: '', message: '' });
  assert.deepEqual(parseStoredFormData('{"email":"saved@example.com"}'), {
    email: 'saved@example.com',
    message: '',
  });
});

test('form is complete only when both trimmed fields have values', async () => {
  const { isFormDataComplete } = await loadModule('../src/js/form-state.js');

  assert.equal(typeof isFormDataComplete, 'function');
  assert.equal(
    isFormDataComplete({ email: 'student@example.com', message: 'Hello' }),
    true
  );
  assert.equal(
    isFormDataComplete({ email: 'student@example.com', message: '   ' }),
    false
  );
});
