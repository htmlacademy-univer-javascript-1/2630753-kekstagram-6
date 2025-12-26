import { getRandomNumberOptimized } from './random-generator.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures, container');
const imgFilters = document.querySelector('.img-filters');
const listOfPosts = document.createDocumentFragment();
const allPostsComments = [];

function removePreviosPictures(previosPictures){
  previosPictures.forEach((picture) => {
    picture.remove();
  });
}

function createPost(post, randomCheck, repeatingPictures, i){
  post.forEach(() => {
    if (randomCheck){
      while(repeatingPictures.includes(i)){
        i = getRandomNumberOptimized(0, post.length);
      }
      repeatingPictures.push(i);
    }

    const userPicture = pictureTemplate.cloneNode(true);
    const pictureImg = userPicture.querySelector('.picture__img');
    const pictureComments = userPicture.querySelector('.picture__comments');
    const pictureLikes = userPicture.querySelector('.picture__likes');

    pictureImg.src = post[i].url;
    pictureImg.alt = post[i].description;
    allPostsComments.push(post[i].comments);
    pictureComments.textContent = post[i].comments.length;
    pictureLikes.textContent = String(post[i].likes);
    listOfPosts.appendChild(userPicture);

    if (!randomCheck){
      i += 1;
    }
  });
}

const showPost = function(post, randomCheck){
  const previosPictures = document.querySelectorAll('.picture');
  const repeatingPictures = [];
  let i;

  if (randomCheck){
    i = getRandomNumberOptimized(0, post.length);
  }
  else{
    i = 0;
  }

  removePreviosPictures(previosPictures);
  createPost(post, randomCheck, repeatingPictures, i);

  picturesContainer.appendChild(listOfPosts);
  imgFilters.classList.remove('img-filters--inactive');
};

export{showPost, allPostsComments};
