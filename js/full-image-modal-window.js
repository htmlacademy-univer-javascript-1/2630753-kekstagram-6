import { allPostsComments } from './show-users-posts.js';

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
const allComments = allPostsComments;
const amountsOfCommentsToLoad = 5;
const commentAvatarSize = {width: 35, height: 35};
let commentsCurrency = amountsOfCommentsToLoad;

const body = document.querySelector('body');

function createComments(allCommentsOfPost){
  allCommentsOfPost.forEach((comment) => {
    const socialCommentsItem = document.createElement('li');
    const socialCommentsItemImg = document.createElement('img');
    const socialCommentsItemMessage = document.createElement('p');
    const borderForMessages = socialComments.childElementCount;

    socialCommentsItem.classList.add('social__comment');
    socialCommentsItemImg.classList.add('social__picture');
    socialCommentsItemImg.src = comment.avatar;
    socialCommentsItemImg.alt = comment.name;
    socialCommentsItemMessage.textContent = comment.message;
    socialCommentsItemImg.width = commentAvatarSize.width;
    socialCommentsItemImg.height = commentAvatarSize.height;

    if (borderForMessages >= amountsOfCommentsToLoad){
      socialCommentsItem.classList.add('hidden');
    }

    socialCommentsItem.appendChild(socialCommentsItemImg);
    socialCommentsItem.appendChild(socialCommentsItemMessage);
    socialComments.appendChild(socialCommentsItem);
  });
}

function checkCommentAmount(socialCommentsItemsHiddenCount){
  if (socialCommentsItemsHiddenCount === 0){
    commentsLoader.classList.add('hidden');
    commentsCurrency = amountsOfCommentsToLoad;
  }
}

function getPostData(likes, comments, postDescription, img){
  likesCount.textContent = likes;
  commentsCount.textContent = comments;
  socialCaption.textContent = postDescription;
  bigPictureImg.src = img.src;
}

function openFullWindowPost(event){
  if (event.target.closest('.picture')){
    commentsLoader.classList.remove('hidden');
    const pictureElement = event.target.closest('.picture');
    const postIndex = Array.prototype.indexOf.call(picturesContainer.children, pictureElement) - 2;
    const img = pictureElement.querySelector('.picture__img');
    const comments = pictureElement.querySelector('.picture__comments').textContent;
    const likes = pictureElement.querySelector('.picture__likes').textContent;
    const postDescription = pictureElement.querySelector('.picture__img').alt;
    const allCommentsOfPost = allComments[postIndex].slice(0, Number(comments));

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    getPostData(likes, comments, postDescription, img);

    if(Number(commentsCount.textContent) >= amountsOfCommentsToLoad){
      socialCommentsCount.innerHTML = `${amountsOfCommentsToLoad} из <span class="comments-count">${commentsCount.textContent}</span> комментариев`;
    }
    else{
      socialCommentsCount.innerHTML = `${commentsCount.textContent} из <span class="comments-count">${commentsCount.textContent}</span> комментариев`;
    }

    createComments(allCommentsOfPost);
  }

  const socialCommentsItemsHiddenCount = socialComments.querySelectorAll('.social__comment.hidden').length;

  checkCommentAmount(socialCommentsItemsHiddenCount);
}

picturesContainer.addEventListener('click', openFullWindowPost);

commentsLoader.addEventListener('click', () => {
  const socialCommentsItemsHidden = socialComments.querySelectorAll('.social__comment.hidden');

  for (let i = 0; i < socialCommentsItemsHidden.length; i++) {
    socialCommentsItemsHidden[i].classList.remove('hidden');
    if (i === amountsOfCommentsToLoad - 1){
      break;
    }
  }

  const socialCommentsItemsHiddenCount = socialComments.querySelectorAll('.social__comment.hidden').length;

  if(socialCommentsItemsHidden.length >= amountsOfCommentsToLoad){
    commentsCurrency += amountsOfCommentsToLoad;
  }
  else{
    commentsCurrency += socialCommentsItemsHidden.length;
  }

  socialCommentsCount.innerHTML = `${commentsCurrency} из <span class="comments-count">${commentsCount.textContent}</span> комментариев`;

  checkCommentAmount(socialCommentsItemsHiddenCount);
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
