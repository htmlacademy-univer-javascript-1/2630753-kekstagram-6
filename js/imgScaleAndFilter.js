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
  start: 100,
  step: 10,
  connect: [true, false],
});

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
});

effectsList.forEach((effect) =>{
  effect.addEventListener('click', () =>{
    const effectValue = effect.querySelector('input').value;
    if (effectValue === 'chrome'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });

      imgUploadEffectLevel.classList.remove('hidden');

      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = Math.round(slider.noUiSlider.get() * 10) / 10;
        img.style.filter = `grayscale(${Math.round(effectLevelValue.value * 10) / 10})`;
      });
    }

    if (effectValue === 'sepia'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });

      imgUploadEffectLevel.classList.remove('hidden');

      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = Math.round(slider.noUiSlider.get() * 10) / 10;
        img.style.filter = `sepia(${Math.round(effectLevelValue.value * 10) / 10})`;
      });
    }

    if (effectValue === 'marvin'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });

      imgUploadEffectLevel.classList.remove('hidden');

      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = Math.round(slider.noUiSlider.get() * 10) / 10;
        img.style.filter = `invert(${Math.round(effectLevelValue.value * 10) / 10}%)`;
      });
    }

    if (effectValue === 'phobos'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });

      imgUploadEffectLevel.classList.remove('hidden');

      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = Math.round(slider.noUiSlider.get() * 10) / 10;
        img.style.filter = `blur(${Math.round(effectLevelValue.value * 10) / 10}px)`;
      });
    }

    if (effectValue === 'heat'){
      slider.noUiSlider.updateOptions({
        range:{
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });

      imgUploadEffectLevel.classList.remove('hidden');

      slider.noUiSlider.on('update', () => {
        effectLevelValue.value = Math.round(slider.noUiSlider.get() * 10) / 10;
        img.style.filter = `brightness(${Math.round(effectLevelValue.value * 10) / 10})`;
      });
    }

    if (effectValue === 'none'){
      imgUploadEffectLevel.classList.add('hidden');

      slider.noUiSlider.on('update', () => {
        img.style.filter = 'none';
      });
    }
  });
});

scaleControlSmaller.addEventListener('click', () =>{
  if (Number(scaleControlValue.value.replace('%', '') !== 25)){
    scaleControlValue.value = `${Math.round(Number(scaleControlValue.value.replace('%', '')) - 25)}%`;
    imgUploadPreview.style.transform = `scale(${scaleControlValue.value.replace('%', '') / 100})`;
  }
});

scaleControlBigger.addEventListener('click', () =>{
  if (Number(scaleControlValue.value.replace('%', '') !== 100)){
    scaleControlValue.value = `${Math.round(Number(scaleControlValue.value.replace('%', '')) + 25)}%`;
    imgUploadPreview.style.transform = `scale(${scaleControlValue.value.replace('%', '') / 100})`;
  }
});
