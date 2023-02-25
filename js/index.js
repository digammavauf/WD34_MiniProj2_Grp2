"use-strict";

let showPost = document.querySelector(".showPost");
let postForm = document.querySelector(".postFormSection");
let back = document.querySelector(".back");
let btnShare = document.querySelector(".formBtnSubmit");
let allPostContainer = document.querySelector(".allPostContainer");
let formtextArea = document.querySelector(".formtextArea");
let formNameInput = document.querySelector(".formNameInput");
let cta = document.querySelector(".cta");

let post = [];

function renderAllpost() {
  allPostContainer.innerHTML = "";

  if (post.length === 0) {
    allPostContainer.innerHTML = `<div class = "no-post"><p>No post yet</p></div>`;
  }

  if (post.length >= 1) {
    post.map(function (item, index) {
      const html = `<li class="postContainer" data-id="${item.id}">
        <div class="postMessage">
          <div class="postHeader">
            <div class="clientIcon">
              <i class="clientIcons fa-solid fa-user"></i>
            </div>
            <div class="clientInfo">
              <h2>${item.name}</h2>
            </div>
          </div>
          <div class="clientPost">
            <div class="clientMessage">
              <p>${item.message}</p>
            </div>
          </div>
        </div>
      </li>`;
      allPostContainer.insertAdjacentHTML("afterbegin", html);
      // allPostContainer.innerHTML += html;
    });
  }
}
renderAllpost();

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
