"use-strict";

let showPost = document.querySelector(".showPost");
let postForm = document.querySelector(".postFormSection");
let back = document.querySelector(".back");
let btnShare = document.querySelector(".formBtnSubmit");
let allPostContainer = document.querySelector(".allPostContainer");
let formtextArea = document.querySelector(".formtextArea");
let formNameInput = document.querySelector(".formNameInput");
let cta = document.querySelector(".cta");

function showCta() {
  postForm.classList.add("showPost");
}

function backCta() {
  postForm.classList.remove("showPost");
}

function shareFn(e) {
  e.preventDefault();
  const namePost = formNameInput.value;
  const messagePost = formtextArea.value;
  const id = Math.random() * 100000;
  console.log(namePost, messagePost, id);

  const newPost = {
    id: id,
    name: namePost,
    message: messagePost,
  };

  // post = [...post, newPost];
  post.push(newPost);

  renderAllpost();
  backCta();
  formNameInput.value = "";
  formtextArea.value = "";
}


back.addEventListener("click", backCta);
showPost.addEventListener("click", showCta);
cta.addEventListener("submit", shareFn);
