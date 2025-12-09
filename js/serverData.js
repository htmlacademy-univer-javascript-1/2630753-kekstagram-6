import { closeModalOnEsc } from "./fullImageModalWindow.js";

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
const effectNone= effectsList[0].querySelector('input');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const slider = imgUploadEffectLevel.querySelector('.effect-level__slider');


const postData = function(form){
    fetch("https://29.javascript.htmlacademy.pro/kekstagram",{
      method: "POST",
      body: new FormData(form)
})
    .then((responce) => {
        if (responce.ok){
            console.log(`${responce.status} ${responce.statusText}`)
        }
        else{
            throw new Error(`${responce.status} ${responce.statusText}`)
        } 

        const successMessage = successTemplate.cloneNode(true);
        const successMessageButton = successMessage.querySelector('.success__button')

        successMessageButton.addEventListener('click', () =>{
            body.removeChild(successMessage);
            uploadOverlay.classList.remove('hidden');
            body.classList.add('modal-open');
        });
        uploadOverlay.classList.add('hidden');
        body.classList.remove('modal-open');
        imgUploadInput.value = '';
        textHashtags.value = '';
        textDescription.value = '';
        slider.noUiSlider.updateOptions({
            range:{
            min: 0,
            max: 100
            },
            start: 80
        });
        img.style.filter = 'none';
        effectNone.checked = true;
        imgUploadEffectLevel.classList.add('hidden');
        body.appendChild(successMessage);
    })
    .catch((err) =>{
        const errorMessage = errorTemplate.cloneNode(true);
        const errorMessageButton = errorMessage.querySelector('.error__button')

        function closeMessage(){
            errorMessage.classList.add('hidden');
            uploadOverlay.classList.remove('hidden');
            body.classList.add('modal-open');
        }

        function closeMessageOnEsc(evt){
            if(evt.key == 'Escape' && !errorMessage.classList.contains("hidden")){
                evt.preventDefault();
                errorMessage.classList.add('hidden');
                uploadOverlay.classList.remove('hidden');
                body.classList.add('modal-open');
                document.removeEventListener('keydown', closeMessageOnEsc);
                document.addEventListener('keydown', closeModalOnEsc);
            }
            else{
                closeModalOnEsc();
            }
        }

        errorMessageButton.addEventListener('click', closeMessage);
        document.addEventListener('keydown', closeMessageOnEsc);

        uploadOverlay.classList.add('hidden');
        body.classList.remove('modal-open');
        imgUploadInput.value = '';
        body.appendChild(errorMessage)
    })
}

export { postData }