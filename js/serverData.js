import { closeUploadWindowOnEsc } from './formValidation.js';

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
const effectNone = effectsList[0].querySelector('input');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const slider = imgUploadEffectLevel.querySelector('.effect-level__slider');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlValue = document.querySelector('.scale__control--value');


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
      const successMessageButton = successMessage.querySelector('.success__button');

      function closeMessage(){
        if (body.contains(successMessage)){
          body.removeChild(successMessage);
          successMessageButton.removeEventListener('click', closeMessage);

          document.removeEventListener('click', closeMessageOnClick);
          document.removeEventListener('keydown', closeMessageOnEsc);
          document.addEventListener('keydown', closeUploadWindowOnEsc);
        }
      }

      function closeMessageOnClick(){
        if (body.contains(successMessage)){
          body.removeChild(successMessage);
          successMessageButton.removeEventListener('click', closeMessage);

          document.removeEventListener('click', closeMessageOnClick);
          document.removeEventListener('keydown', closeMessageOnEsc);
          document.addEventListener('keydown', closeUploadWindowOnEsc);
        }
      }

      function closeMessageOnEsc(evt){
        if (evt.key === 'Escape' && body.contains(successMessage)){
          evt.preventDefault();
          body.removeChild(successMessage);

          successMessageButton.removeEventListener('click', closeMessage);
          document.removeEventListener('click', closeMessageOnClick);
          document.removeEventListener('keydown', closeMessageOnEsc);
          document.addEventListener('keydown', closeUploadWindowOnEsc);
        }
      }

      uploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      imgUploadInput.value = '';
      textHashtags.value = '';
      textDescription.value = '';
      scaleControlValue.value = '100%';
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 100
        },
        start: 100
      });
      img.style.filter = 'none';
      effectNone.checked = true;
      imgUploadEffectLevel.classList.add('hidden');
      body.appendChild(successMessage);

      successMessageButton.addEventListener('click', closeMessage);
      document.addEventListener('keydown', closeMessageOnEsc);
      document.addEventListener('click', closeMessageOnClick);
    })
    .catch(() =>{
      const errorMessage = errorTemplate.cloneNode(true);
      const errorMessageButton = errorMessage.querySelector('.error__button');

      function closeMessage(){
        if (body.contains(errorMessage)){
          body.removeChild(errorMessage);
          uploadOverlay.classList.remove('hidden');
          body.classList.add('modal-open');

          document.removeEventListener('keydown', closeMessageOnEsc);
          errorMessageButton.removeEventListener('click', closeMessage);
          document.removeEventListener('click', closeMessageOnClick);
        }
      }

      function closeMessageOnClick(){
        if (body.contains(errorMessage)){
          body.removeChild(errorMessage);
          uploadOverlay.classList.remove('hidden');
          body.classList.add('modal-open');

          document.removeEventListener('keydown', closeMessageOnEsc);
          errorMessageButton.removeEventListener('click', closeMessage);
          document.removeEventListener('click', closeMessageOnClick);
        }
      }

      function closeMessageOnEsc(evt){
        if (evt.key === 'Escape' && body.contains(errorMessage)){
          evt.preventDefault();
          body.removeChild(errorMessage);
          uploadOverlay.classList.remove('hidden');
          body.classList.add('modal-open');

          document.removeEventListener('keydown', closeMessageOnEsc);
          errorMessageButton.removeEventListener('click', closeMessage);
          document.removeEventListener('click', closeMessageOnClick);
        }
      }

      errorMessageButton.addEventListener('click', closeMessage);
      document.addEventListener('keydown', closeMessageOnEsc);
      document.addEventListener('click', closeMessageOnClick);

      uploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      imgUploadInput.value = '';
      body.appendChild(errorMessage);
    });
};

export { postData };
