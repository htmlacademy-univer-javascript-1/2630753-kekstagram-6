const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');

const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const slider = imgUploadEffectLevel.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list').querySelectorAll('.effects__item');

imgUploadEffectLevel.classList.add('hidden');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100
  },
  start: 80,
  step: 10,
  connect: [true, false],
});

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get()
});

effectsList.forEach((effect) =>{
  effect.addEventListener('click', () =>{
    const effectValue = effect.querySelector('input').value;
    if (effectValue === 'chrome'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 100
        }
      });

      imgUploadEffectLevel.classList.remove('hidden');

      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = slider.noUiSlider.get();
        img.style.filter = `grayscale(${effectLevelValue.value / 100})`;
      });
    };
    if (effectValue === 'sepia'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 100
        }
      });

      imgUploadEffectLevel.classList.remove('hidden');

      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = slider.noUiSlider.get();
        img.style.filter = `sepia(${effectLevelValue.value / 100})`;
      });
    };
    if (effectValue === 'marvin'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 100
        }
      });

      imgUploadEffectLevel.classList.remove('hidden');

      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = slider.noUiSlider.get();
        img.style.filter = `invert(${effectLevelValue.value}%)`;
      });
    };
    if (effectValue === 'phobos'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 300
        }
      });

      imgUploadEffectLevel.classList.remove('hidden');

      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = slider.noUiSlider.get();
        img.style.filter = `blur(${effectLevelValue.value / 100}px)`;
      });
    };
    if (effectValue === 'heat'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 300
        }
      });

      imgUploadEffectLevel.classList.remove('hidden');

      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = slider.noUiSlider.get();
        img.style.filter = `brightness(${effectLevelValue.value / 100})`;
      });
    };
    if (effectValue === 'none'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 100
        }
      });

      imgUploadEffectLevel.classList.add('hidden');

      slider.noUiSlider.on('update', () => {
        img.style.filter = `none`
      });
    }; 
  });
});

scaleControlSmaller.addEventListener('click', () =>{
  if (Number(scaleControlValue.value.replace('%', '') != 25)){
    scaleControlValue.value = Number(scaleControlValue.value.replace('%', '')) - 25 + '%';
    imgUploadPreview.style.transform = `scale(${scaleControlValue.value.replace('%', '') / 100})`;
  };
});

scaleControlBigger.addEventListener('click', () =>{
  if (Number(scaleControlValue.value.replace('%', '') != 100)){
    scaleControlValue.value = Number(scaleControlValue.value.replace('%', '')) + 25 + '%';
    imgUploadPreview.style.transform = `scale(${scaleControlValue.value.replace('%', '') / 100})`;
  };
});
