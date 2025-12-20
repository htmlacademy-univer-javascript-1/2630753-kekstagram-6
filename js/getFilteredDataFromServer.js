import { showPost } from './showUsersPosts.js';

const imgFilters = document.querySelector('.img-filters');
const defaultFilterButton = imgFilters.querySelector('#filter-default');
const randomFilterButton = imgFilters.querySelector('#filter-random');
const discussedFilterButton = imgFilters.querySelector('#filter-discussed');
const body = document.querySelector('body');

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
      const error = document.createElement('div');
      error.textContent = 'Ошибка загрузки';
      error.classList.add('data-error');
      body.prepend(error);
      setTimeout(() => error.remove(), 3000);
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
      const error = document.createElement('div');
      error.textContent = 'Ошибка загрузки';
      error.classList.add('data-error');
      body.prepend(error);
      setTimeout(() => error.remove(), 3000);
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
      const error = document.createElement('div');
      error.textContent = 'Ошибка загрузки';
      error.classList.add('data-error');
      body.prepend(error);
      setTimeout(() => error.remove(), 3000);
    });
});

fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((post) => {
    setTimeout(() => showPost(post, false), 500);
  })
  .catch(() => {
    // eslint-disable-next-line no-alert
    const error = document.createElement('div');
    error.textContent = 'Ошибка загрузки';
    error.classList.add('data-error');
    body.prepend(error);
    setTimeout(() => error.remove(), 3000);
  });
