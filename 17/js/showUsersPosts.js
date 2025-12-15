import { getRandomNumberOptimized } from "./randomGenerator.js";

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures, container');
const imgFilters = document.querySelector('.img-filters');
const listOfPosts = document.createDocumentFragment();
let allPostsComments = [];

const showPost = function(post, randomCheck){
  const previosPictures = document.querySelectorAll('.picture');
  const repeatingPictures = [];
  allPostsComments = [];
  let i;

  if (randomCheck){
    i = getRandomNumberOptimized(0, post.length);
  }
  else{
    i = 0;
  }

  previosPictures.forEach((picture) => {
    picture.remove();
  });
  
  post.forEach(() => {
    if (randomCheck){
      while(repeatingPictures.includes(i)){
        i = getRandomNumberOptimized(0, post.length);
      };
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
    };
  });
  picturesContainer.appendChild(listOfPosts);
  imgFilters.classList.remove('img-filters--inactive');
};

// const showRandomPost = function(post){
//   const previosPictures = document.querySelectorAll('.picture')
//   const repeatingPictures = [];
//   allPostsComments = [];

//   previosPictures.forEach((picture) => {
//     picture.remove()
//   });

//   imgFilters.classList.remove('img-filters--inactive');
  

//   post.forEach(() => {
//     let i = getRandomNumberOptimized(0, post.length);

//     while(repeatingPictures.includes(i)){
//       i = getRandomNumberOptimized(0, post.length);
//     };

//     const userPicture = pictureTemplate.cloneNode(true);
//     const pictureImg = userPicture.querySelector('.picture__img');
//     const pictureComments = userPicture.querySelector('.picture__comments');
//     const pictureLikes = userPicture.querySelector('.picture__likes');

//     pictureImg.src = post[i].url;
//     pictureImg.alt = post[i].description;
//     allPostsComments.push(post[i].comments);
//     pictureComments.textContent = post[i].comments.length;
//     pictureLikes.textContent = String(post[i].likes);
//     listOfPosts.appendChild(userPicture);
//     repeatingPictures.push(i);
//   });
//   picturesContainer.appendChild(listOfPosts);
// };

export{showPost, allPostsComments};