// import { createPost } from "./posts.js";

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesContainer = document.querySelector('.pictures, container');
const listOfPosts = document.createDocumentFragment();

// const post = createPost;
let i = 0;

const showPost = function(post){
  post.forEach(() => {
    const userPicture = pictureTemplate.cloneNode(true);
    const pictureImg = userPicture.querySelector('.picture__img');
    const pictureComments = userPicture.querySelector('.picture__comments');
    const pictureLikes = userPicture.querySelector('.picture__likes');

    pictureImg.src = post[i].url;
    pictureImg.alt = post[i].description;
    pictureComments.textContent = post[i].comments.length;
    pictureLikes.textContent = String(post[i].likes);
    listOfPosts.appendChild(userPicture);
    i++
  });
  picturesContainer.appendChild(listOfPosts)
};

export{showPost}


