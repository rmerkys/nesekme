// https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=965&q=80 naudoti img

const loginform = document.querySelector("#login");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const registerFormContainer = document.querySelector("#registerform");
const registerForm = document.querySelector("#register");
const createForm = document.querySelector(".create");
const createPost = document.querySelector("#createpost");
const logOut = document.querySelector("#logout");
const createPostForm = document.querySelector(".create-post-form");

window.addEventListener("load", (event) => {
  const localStrorageMasyvas = localStorage.getItem("identification");
  if (localStrorageMasyvas) {
    loginform.style.display = "none";
    createForm.style.display = "block";
  }
});

registerFormContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const registerContainer = document.querySelector("#registercontainer");

  if (registerContainer.style.display === "block") {
    registerContainer.style.display = "none";
  } else {
    registerContainer.classList.toggle("registercontainer");
    registerContainer.style.display = "block";
  }
});

loginform.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch("https://testapi.io/api/rksmrks/resource/Logins", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const newLogin = data.data.filter((user) => {
        if (
          user.username === username.value &&
          user.password === password.value
        ) {
          const userString = JSON.stringify(username.value);
          localStorage.setItem("identification", `${userString}`);
          loginform.style.display = "none";
          createForm.style.display = "block";
          username.value = "";
          password.value = "";
          return;
        }
        return;
      });
      const newLogin2 = data.data.filter((user) => {
        if (
          user.username !== username.value &&
          user.password !== password.value
        ) {
          username.style.border = "1px solid red";
          password.style.border = "1px solid red";
          username.value = "";
          password.value = "";
          return;
        }
        return;
      });
    })
    .catch((err) => console.log(err));
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log(e.target.elements[0].value);
  // console.log(e.target.elements[1].value);
  // console.log(e.target.elements[2].value);

  const username1 = e.target.elements[0].value;
  const password1 = e.target.elements[1].value;
  const repeatPassword1 = e.target.elements[2].value;

  if (password1 === repeatPassword1) {
    fetch("https://testapi.io/api/rksmrks/resource/Logins", {
      method: "POST",
      body: JSON.stringify({
        username: username1,
        password: password1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const userString1 = JSON.stringify(username1.value);
        localStorage.setItem("identification", `${userString1}`);
        window.location.reload();
        return data;
      })
      .catch((err) => console.log(err));
  }
});

createPost.addEventListener("click", function (e) {
  e.preventDefault();

  createPostForm.classList.toggle("create-post-form");

  if (createPostForm.style.display === "block") {
    createPostForm.classList.toggle("create-post-form");
    createPostForm.style.display = "none";
  } else {
    createPostForm.classList.toggle("create-post-form");
    createPostForm.style.display = "block";
  }
});

logOut.addEventListener("click", function (e) {
  e.preventDefault();

  localStorage.removeItem("identification");
  window.location.reload();
});

const addPostForm = document.getElementById("create-post");
const postsContainer = document.getElementById("posts");
let editPostId = null;
const API_ENDPOINTS = {
  post: "	https://testapi.io/api/rksmrks/resource/Posts",
  get: "https://testapi.io/api/rksmrks/resource/Posts",
  getPostById: (id) => `	https://testapi.io/api/rksmrks/resource/Posts/${id}`,
  edit: (id) => `https://testapi.io/api/rksmrks/resource/Posts/${id}`,
  delete: (id) => `https://testapi.io/api/rksmrks/resource/Posts/${id}`,
};
const handleButtonName = (name) => {
  const btn = document.querySelector("button[type=submit]");
  btn.innerText = name;
};
const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
const getPostById = (id) => {
  const url = API_ENDPOINTS.getPostById(id);
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
const editData = (url, data) => {
  return fetch(url, {
    method: "PUT",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
const deletePost = (id) => {
  const url = API_ENDPOINTS.delete(id);
  return fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      response.status === 204 && document.getElementById(id).remove();
    })
    .catch((err) => console.log(err));
};
const postData = (url, data) => {
  return fetch(url, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};
const postTemplate = (data) => {
  const x = JSON.stringify(data);
  return `
    <div id=${data.id} class="mainpost">
    <div class="change-buttons">
    <button class="edit" onClick=handlePostEdit(${data.id})>Edit</button>
    <button class="delete" onClick=deletePost(${data.id})>Delete</button>
    </div>
    <p class="posttitle">${data.title}</p>
    <img src="${data.img}" alt="${data.id}">
    <p class="posttext">${data.content}</p>
    <div class="social">
        <hr>
        <div class="social-icons">
            <i class="fa-brands fa-facebook-f fa-sm"></i>
            <i class="fa-brands fa-twitter fa-sm"></i>
            <i class="fa-brands fa-linkedin-in fa-sm"></i>
            <i class="fa-solid fa-link fa-sm"></i>
        </div>
        <hr>
        <div class="socialcounts">
            <p class="views"><span class="viewcount">0</span>views</p>
            <p class="comments"><span class="commentcount">0</span>comments</p>
            <p class="hearts"><span class="heartscount">0</span><i class="fa-regular fa-heart"></i></p>
            <!-- <i class="fa-solid fa-heart"></i> reikes pakeitimui paspaudus -->
        </div>
    </div>
</div>
    `;
};
const handlePostEdit = async (id) => {
  editPostId = id;
  const postDataById = await getPostById(id);
  const arr = [...addPostForm.getElementsByTagName("input")];
  arr.forEach((input) => {
    input.value = postDataById[input.name];
  });
  handleButtonName("Update Post");
};
const handlePostUpdate = async (formData, id) => {
  const updatedPost = await editData(
    API_ENDPOINTS.edit(id),
    new URLSearchParams(formData)
  );
  document.getElementById(id).remove();
  postsContainer.innerHTML += postTemplate(updatedPost);
  editPostId = null;
  handleButtonName("Add Post");
};
const handleFormSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  if (editPostId) {
    handlePostUpdate(formData, editPostId);
  } else {
    const newPost = await postData(API_ENDPOINTS.post, formData);
    postsContainer.innerHTML += postTemplate(newPost);
  }
  e.target.reset();
};
addPostForm.addEventListener("submit", handleFormSubmit);
window.onload = async () => {
  const posts = await getData(API_ENDPOINTS.get);
  posts.data.forEach((post) => {
    postsContainer.innerHTML += postTemplate(post);
  });
};
