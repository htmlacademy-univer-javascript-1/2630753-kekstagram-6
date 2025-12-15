import { postData } from "./serverData.js";

const imgUploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const effectNone = document.querySelector('.effects__list').querySelector('.effects__item').querySelector('input')
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const img = imgUploadPreview.querySelector('img');

const patternHashStroke = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__form__error-text'
});

function validateTagsStructure (value) {
  let tagsValid = true;
  if (textHashtags.value.length != 0){
    const tags = textHashtags.value.split(" ");

    for (let i = 0; i < tags.length; i++){
      tagsValid = tagsValid && patternHashStroke.test(tags[i]);
    };
  };

  return tagsValid;
};

function validateTagsAmount (value) {
  const tags = textHashtags.value.split(" ");
  if (tags.length <= 5){
    return true;
  };
  return false;
};

function validateTagsRepeat (value) {
  const tags = textHashtags.value.split(" ");
  let tagsValid = true;
  let hashArray = [];

  for (let i = 0; i < tags.length; i++){
    tagsValid = tagsValid && !hashArray.includes(tags[i]);
    hashArray.push(tags[i]);
  };
  return tagsValid;
};

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



imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  if (pristine.validate()){
    postData(imgUploadForm);
  };
});

imgUploadInput.addEventListener('change', function(){
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadPreview.style.transform = 'scale(1)';
});

document.addEventListener('keydown', (evt) =>{
  if (evt.key == 'Escape' && (textHashtags !== document.activeElement && textDescription !== document.activeElement)){
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    imgUploadInput.value = '';
  }
  else{
    body.classList.add('modal-open');
  };
});

imgUploadCancel.addEventListener('click', (evt) =>{
  if (textHashtags !== document.activeElement && textDescription !== document.activeElement){
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    imgUploadInput.value = '';
    imgUploadPreview.style.transform = 'scale(1)';
    img.style.filter = 'none';
    effectNone.checked = true;
    imgUploadEffectLevel.classList.add('hidden');
    textHashtags.value = '';
    textDescription.value = '';
  }
  else{
    body.classList.add('modal-open');
  };
});
