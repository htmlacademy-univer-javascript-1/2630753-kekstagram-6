import { allPostsComments } from './showUsersPosts.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImgContainer = bigPicture.querySelector('.big-picture__img');
const bigPictureImg = bigPictureImgContainer.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const picturesContainer = document.querySelector('.pictures, container');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
let commentsCurrency = 5;

const body = document.querySelector('body');

function openFullWindowPost(event){
  let allComments = allPostsComments;

  if (event.target.closest('.picture')){
    commentsLoader.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    const pictureElement = event.target.closest('.picture');
    const postIndex = Array.prototype.indexOf.call(picturesContainer.children, pictureElement) - 2;
    const img = pictureElement.querySelector('.picture__img');
    const comments = pictureElement.querySelector('.picture__comments').textContent;
    const likes = pictureElement.querySelector('.picture__likes').textContent;
    const postDescription = pictureElement.querySelector('.picture__img').alt;

    bigPicture.classList.remove('hidden');
    likesCount.textContent = likes;
    commentsCount.textContent = comments;
    socialCaption.textContent = postDescription;
    bigPictureImg.src = img.src;
    body.classList.add('modal-open');
    allComments = allPostsComments[postIndex].slice(0, Number(commentsCount.textContent));

    if(Number(commentsCount.textContent) >= 5){
      socialCommentsCount.innerHTML = `5 из <span class="comments-count">${commentsCount.textContent}</span> комментариев`;
    }
    else{
      socialCommentsCount.innerHTML = `${commentsCount.textContent} из <span class="comments-count">${commentsCount.textContent}</span> комментариев`;
    }

    allComments.forEach((comment) => {
      const socialCommentsItem = document.createElement('li');
      const socialCommentsItemImg = document.createElement('img');
      const socialCommentsItemMessage = document.createElement('p');
      const borderForMessages = socialComments.childElementCount;

      socialCommentsItem.classList.add('social__comment');
      socialCommentsItemImg.classList.add('social__picture');
      socialCommentsItemImg.src = comment.avatar;
      socialCommentsItemImg.alt = comment.name;
      socialCommentsItemMessage.textContent = comment.message;
      socialCommentsItemImg.width = 35;
      socialCommentsItemImg.height = 35;
      socialCommentsItem.classList.add('social__comment');
      socialCommentsItemImg.classList.add('social__picture');
      socialCommentsItemImg.src = comment.avatar;
      socialCommentsItemImg.alt = comment.name;
      socialCommentsItemMessage.textContent = comment.message;
      socialCommentsItemImg.width = 35;
      socialCommentsItemImg.height = 35;

      if (borderForMessages >= 5){
        socialCommentsItem.classList.add('hidden');
      }

      socialCommentsItem.appendChild(socialCommentsItemImg);
      socialCommentsItem.appendChild(socialCommentsItemMessage);
      socialComments.appendChild(socialCommentsItem);
    });
  }

  const socialCommentsItemsHiddenCount = socialComments.querySelectorAll('.social__comment.hidden').length;

  if (socialCommentsItemsHiddenCount === 0){
    commentsLoader.classList.add('hidden');
    commentsCurrency = 5;
  }
}

picturesContainer.addEventListener('click', openFullWindowPost);

commentsLoader.addEventListener('click', () => {
  // const socialCommentsItems = socialComments.querySelectorAll('.social__comment');
  const socialCommentsItemsHidden = socialComments.querySelectorAll('.social__comment.hidden');

  for (let i = 0; i < socialCommentsItemsHidden.length; i++) {
    socialCommentsItemsHidden[i].classList.remove('hidden');
    if (i === 4){
      break;
    }
  }

  const socialCommentsItemsHiddenCount = socialComments.querySelectorAll('.social__comment.hidden').length;

  if(socialCommentsItemsHidden.length >= 5){
    commentsCurrency += 5;
  }
  else{
    commentsCurrency += socialCommentsItemsHidden.length;
  }

  socialCommentsCount.innerHTML = `${commentsCurrency} из <span class="comments-count">${commentsCount.textContent}</span> комментариев`;

  if (socialCommentsItemsHiddenCount === 0){
    commentsLoader.classList.add('hidden');
    commentsCurrency = 5;
  }
});

function closeModal(){
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  socialComments.innerHTML = '';
}

function closeModalOnEsc(evt){
  if (evt.key === 'Escape'){
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    socialComments.innerHTML = '';
  }
}

document.addEventListener('keydown', closeModalOnEsc);

bigPictureCancel.addEventListener('click', closeModal);


export { closeModalOnEsc, openFullWindowPost };
