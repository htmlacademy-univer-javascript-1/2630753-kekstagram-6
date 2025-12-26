const fileTypes = ['jpg', 'jpeg', 'png'];
const imgChoose= document.querySelector('.img-upload__input');
const avatar = document.querySelector('.img-upload__preview img');

imgChoose.addEventListener('change', () => {
  const file = imgChoose.files[0];
  const fileName = file.name.toLowerCase();
  const matches = fileTypes.some((it) => fileName.endsWith(it));

  if (matches) {
    avatar.src = URL.createObjectURL(file);
  }
});
