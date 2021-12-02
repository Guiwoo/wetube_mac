const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const delete_btn = document.querySelectorAll(".fas.fa-trash-alt");

const addComment = (text, id) => {
  const videoComment = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const div = document.createElement("div");
  const icon2 = document.createElement("i");
  icon2.className = "fas fa-trash-alt";
  icon2.addEventListener("click", handleDelete);
  div.appendChild(icon);
  div.appendChild(span);
  newComment.appendChild(div);
  newComment.appendChild(icon2);
  videoComment.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newComment } = await response.json();
    addComment(text, newComment);
  }
};

const removeComment = (id) => {
  const videoComment = document.querySelector(".video__comments ul");
  const theone = document.querySelector(`[data-id='${id}']`);
  videoComment.removeChild(theone);
};

const handleDelete = async (e) => {
  const {
    target: {
      parentNode: {
        dataset: { id },
      },
    },
  } = e;
  const response = await fetch(`/api/comments/${id}/comment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (response.status === 201) {
    removeComment(id);
  }
};

delete_btn.forEach((element) => {
  element.addEventListener("click", handleDelete);
});
form.addEventListener("submit", handleSubmit);
btn.addEventListener("click", handleSubmit);
