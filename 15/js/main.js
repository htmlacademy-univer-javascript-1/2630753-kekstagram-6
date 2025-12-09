import {createPost} from "./posts.js";
import { showPost } from "./showUsersPosts.js";
import "./fullImageModalWindow.js";
import "./formValidation.js"
import "./imgScaleAndFilter.js"

fetch("https://29.javascript.htmlacademy.pro/kekstagram/data")
    .then((response) => response.json())
    .then((post) => {
        showPost(post);
    })
    .catch((err) => {
        alert("Не удалось загрузить данные с сервера, пожалуйста, проверьте качество соединения и попробуйте ещё раз")
    })


console.log(createPost);
