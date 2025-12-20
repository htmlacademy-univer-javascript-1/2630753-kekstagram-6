import { showPost } from './showUsersPosts.js';

const imgFilters = document.querySelector('.img-filters');
const defaultFilterButton = imgFilters.querySelector('#filter-default');
const randomFilterButton = imgFilters.querySelector('#filter-random');
const discussedFilterButton = imgFilters.querySelector('#filter-discussed');

defaultFilterButton.addEventListener('click', () => {
  defaultFilterButton.classList.add('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');

  fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((post) => {
      setTimeout(() => showPost(post, false), 500);
    })
    .catch(() => {
      // eslint-disable-next-line no-alert
      alert('Не удалось загрузить данные с сервера, пожалуйста, проверьте качество соединения и попробуйте ещё раз');
    });
});

randomFilterButton.addEventListener('click', () => {
  randomFilterButton.classList.add('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');

  fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((post) => {
      setTimeout(() => showPost(post.slice(15), true), 500);
    })
    .catch(() => {
      // eslint-disable-next-line no-alert
      alert('Не удалось загрузить данные с сервера, пожалуйста, проверьте качество соединения и попробуйте ещё раз');
    });
});

discussedFilterButton.addEventListener('click', () => {
  discussedFilterButton.classList.add('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');

  fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((post) => {
      setTimeout(() => showPost(post.sort((a, b) => b.comments.length - a.comments.length), false), 500);
    })
    .catch(() => {
      // eslint-disable-next-line no-alert
      alert('Не удалось загрузить данные с сервера, пожалуйста, проверьте качество соединения и попробуйте ещё раз');
    });
});

fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((post) => {
    setTimeout(() => showPost(post, false), 500);
  })
  .catch(() => {
    // eslint-disable-next-line no-alert
    alert('Не удалось загрузить данные с сервера, пожалуйста, проверьте качество соединения и попробуйте ещё раз');
  });
