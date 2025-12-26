import { postData } from './server-data.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const effectNone = document.querySelector('.effects__item input');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const img = imgUploadPreview.querySelector('img');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadButton = document.querySelector('.img-upload__submit');
const scaleStartValue = '100%';
const imgStartScale = 'scale(1)';
const imgStartFilter = 'none';
const descriptionMaxLength = 140;
const tagsMaxAmount = 5;

const patternHashStroke = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__form__error-text'
});

function validateTagsStructure () {
  let tagsValid = true;
  if (textHashtags.value.length !== 0){
    const tags = textHashtags.value.trim().split(/\s+/).filter((tag) => tag !== '');

    for (let i = 0; i < tags.length; i++){
      tagsValid = tagsValid && patternHashStroke.test(tags[i]);
    }
  }

  return tagsValid;
}

function validateDescriptionLength () {
  if (textDescription.value.length <= descriptionMaxLength){
    return true;
  }
  return false;
}

function validateTagsAmount () {
  const tags = textHashtags.value.trim().split(/\s+/).filter((tag) => tag !== '');
  if (tags.length <= tagsMaxAmount){
    return true;
  }
  return false;
}

function validateTagsRepeat () {
  const tags = textHashtags.value.trim().split(/\s+/).filter((tag) => tag !== '');

  let tagsValid = true;
  const repeats = [];

  for (let i = 0; i < tags.length; i++){
    tagsValid = tagsValid && !repeats.includes(tags[i]) && !repeats.includes(tags[i].toLowerCase()) && !repeats.includes(tags[i].toUpperCase());
    repeats.push(tags[i]);
  }
  return tagsValid;
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateTagsStructure,
  'Длина хэш-тега должна быть от 1 до 20 символов без специальных символов'
);

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateTagsAmount,
  'Всего можно написать только 5 хэш-тегов'
);

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateTagsRepeat,
  'Xэш-теги не должны повторяться'
);

pristine.addValidator(
  imgUploadForm.querySelector('.text__description'),
  validateDescriptionLength,
  'Длина комментария должна быть не более 140 символов'
);

function unlockButton(){
  imgUploadButton.disabled = false;
  imgUploadButton.textContent = 'Опубликовать';
}


imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  imgUploadButton.disabled = true;
  imgUploadButton.textContent = 'Публикуем...';
  setTimeout(() => unlockButton(), 1000);

  if (pristine.validate()){
    postData(imgUploadForm);
  }
});

imgUploadInput.addEventListener('change', () =>{
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadPreview.style.transform = imgStartScale;
  document.addEventListener('keydown', closeUploadWindowOnEsc);
  imgUploadCancel.addEventListener('click', closeUploadWindow);
});

function closeUploadWindow(){
  if (textHashtags !== document.activeElement && textDescription !== document.activeElement){
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    imgUploadInput.value = '';
    imgUploadPreview.style.transform = imgStartScale;
    img.style.filter = imgStartFilter;
    effectNone.checked = true;
    imgUploadEffectLevel.classList.add('hidden');
    textHashtags.value = '';
    textDescription.value = '';
    scaleControlValue.value = scaleStartValue;
    scaleControlValue.value = scaleStartValue;
  }
  else{
    body.classList.add('modal-open');
  }
}

function closeUploadWindowOnEsc(evt){
  if (evt.key === 'Escape' && (textHashtags !== document.activeElement && textDescription !== document.activeElement) && !uploadOverlay.classList.contains('hidden')){
    closeUploadWindow();
  }
}

imgUploadCancel.addEventListener('click', closeUploadWindow);

export { closeUploadWindow, closeUploadWindowOnEsc };
