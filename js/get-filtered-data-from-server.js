import { showPost } from './show-users-posts.js';

const imgFilters = document.querySelector('.img-filters');
const defaultFilterButton = imgFilters.querySelector('#filter-default');
const randomFilterButton = imgFilters.querySelector('#filter-random');
const discussedFilterButton = imgFilters.querySelector('#filter-discussed');
const body = document.querySelector('body');

function showError(){
  const error = document.createElement('div');
  error.style.backgroundColor = 'red';
  error.style.height = '50px';
  error.style.display = 'flex';
  error.style.alignItems = 'center';
  error.style.justifyContent = 'center';

  error.textContent = 'Ошибка загрузки';
  error.classList.add('data-error');
  body.prepend(error);
}

function uploadPosts(posts){
  setTimeout(() => posts);
}

function useFilter(filterType){
  fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((post) => {
      if(filterType === 'default'){
        uploadPosts(showPost(post, false), 500);
      }

      if(filterType === 'random'){
        uploadPosts(showPost(post.slice(15), true), 500);
      }

      if(filterType === 'discussed'){
        uploadPosts(showPost(post.sort((a, b) => b.comments.length - a.comments.length), false), 500);
      }
    })
    .catch(() => {
      showError();
    });
}

defaultFilterButton.addEventListener('click', () => {
  defaultFilterButton.classList.add('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');

  useFilter('default');
});

randomFilterButton.addEventListener('click', () => {
  randomFilterButton.classList.add('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');

  useFilter('random');
});

discussedFilterButton.addEventListener('click', () => {
  discussedFilterButton.classList.add('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');

  useFilter('discussed');
});

useFilter('default');
