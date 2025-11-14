import { arrayOfComments } from "./postsComments.js";

const bigPicture = document.querySelector('.big-picture');
const bigPictureImgContainer = bigPicture.querySelector('.big-picture__img');
const bigPictureImg = bigPictureImgContainer.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const picturesContainer = document.querySelector('.pictures, container');

const body = document.querySelector('body');

const comments = arrayOfComments;

picturesContainer.addEventListener('click', function(event){
  if (event.target.closest('.picture')){
    const pictureElement = event.target.closest('.picture');
    const img = pictureElement.querySelector('.picture__img');
    const comments = pictureElement.querySelector('.picture__comments').textContent;
    const likes = pictureElement.querySelector('.picture__likes').textContent;

    bigPicture.classList.remove('hidden');
    likesCount.textContent = likes;
    commentsCount.textContent = comments;
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigPictureImg.src = img.src;
    body.classList.add('modal-open');
  };
});

comments.forEach(comment => {
  const socialComments = bigPicture.querySelector('.social__comments')
  const socialCommentsItem = document.createElement('li')
  const socialCommentsItemImg = document.createElement('img')
  const socialCommentsItemMessage = document.createElement('p')

  socialCommentsItem.classList.add('social__comment')
  socialCommentsItemImg.classList.add('social__picture')
  socialCommentsItemImg.src = comment.avatar
  socialCommentsItemImg.alt = comment.name
  socialCommentsItemMessage.textContent = comment.message
  socialCommentsItemImg.width = 35
  socialCommentsItemImg.height = 35

  socialCommentsItem.appendChild(socialCommentsItemImg)
  socialCommentsItem.appendChild(socialCommentsItemMessage)
  socialComments.appendChild(socialCommentsItem)
});


document.addEventListener('keydown', function(event){
  if (event.key == 'Escape'){
    event.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  };
});
