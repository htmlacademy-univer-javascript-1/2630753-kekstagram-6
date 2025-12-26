import { closeUploadWindowOnEsc } from './form-validation.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const body = document.querySelector('body');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');
const effectsList = document.querySelector('.effects__list').querySelectorAll('.effects__item');
const effectNone = effectsList[0].querySelector('input');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const slider = imgUploadEffectLevel.querySelector('.effect-level__slider');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleStartValue = '100%';
const imgStartFilter = 'none';


function closingMessage(message, isSuccess){
  const messageButton = message.querySelector(isSuccess ? '.success__button' : '.error__button');

  function closeMessage(){
    if (body.contains(message)){
      body.removeChild(message);

      if(!isSuccess){
        uploadOverlay.classList.remove('hidden');
        body.classList.add('modal-open');
      }

      if(isSuccess){
        document.addEventListener('keydown', closeUploadWindowOnEsc);
      }

      document.removeEventListener('keydown', closeMessageOnEsc);
      messageButton.removeEventListener('click', closeMessage);
      document.removeEventListener('click', closeMessage);
    }
  }

  function closeMessageOnEsc(evt){
    if (evt.key === 'Escape' && body.contains(message)){
      evt.preventDefault();
      closeMessage();
    }
  }

  messageButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', closeMessageOnEsc);
  document.addEventListener('click', closeMessage);

  if(isSuccess){
    uploadOverlay.classList.add('hidden');
    imgUploadInput.value = '';
    textHashtags.value = '';
    textDescription.value = '';
    scaleControlValue.value = scaleStartValue;
    slider.noUiSlider.updateOptions({
      range:{
        min: 0,
        max: 100
      },
      start: 100
    });
    img.style.filter = imgStartFilter;
    effectNone.checked = true;
    imgUploadEffectLevel.classList.add('hidden');
  }

  body.appendChild(message);
  imgUploadInput.value = '';
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
}

const postData = function(form){
  fetch('https://29.javascript.htmlacademy.pro/kekstagram',{
    method: 'POST',
    body: new FormData(form)
  })
    .then((responce) => {
      if (responce.ok){
        // eslint-disable-next-line no-console
        console.log(`${responce.status} ${responce.statusText}`);
      }
      else{
        throw new Error(`${responce.status} ${responce.statusText}`);
      }

      const successMessage = successTemplate.cloneNode(true);

      closingMessage(successMessage, true);
    })
    .catch(() =>{
      const errorMessage = errorTemplate.cloneNode(true);

      closingMessage(errorMessage, false);
    });
};

export { postData };
