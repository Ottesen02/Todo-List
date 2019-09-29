const form = document.querySelector("form");

const submit = document.querySelector("#submit");

form.setAttribute("novalidate", true);
form.addEventListener("submit", e => {
  e.preventDefault();

  post();
});

function get() {
  fetch("https://theme3-9970.restdb.io/rest/todolist", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887faafd86cb75861e262a",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(todos => {
      todos.forEach(showTodos);
    });
}
get();

function showTodos(todo) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("article").dataset.todoid = todo._id;
  copy.querySelector("h2").textContent = todo.task;
  copy.querySelector("h3").textContent = todo.deadline;
  copy.querySelector(".category").textContent = todo.category;
  // copy.querySelector(".important").textContent = todo.important;
  copy.querySelector(".deleteTodo").addEventListener("click", () => {
    console.log(todo._id);
    deleteTodo(todo._id);
  });
  document.querySelector(".todo-list").prepend(copy);
  categoryColor();
}

function post() {
  const data = {
    task: form.elements.task.value,
    deadline: form.elements.deadline.value,
    category: form.elements.category.value
    // important: form.elements.important.value
  };
  console.log(data);

  const postData = JSON.stringify(data);
  fetch("https://theme3-9970.restdb.io/rest/todolist", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887faafd86cb75861e262a",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      showTodos(data);
    });
}

function deleteTodo(id) {
  fetch("https://theme3-9970.restdb.io/rest/todolist/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887faafd86cb75861e262a",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      document.querySelector(`article[data-todoid="${id}"]`).remove();
    });
}

function categoryColor() {
  let category = document.querySelector(".category");

  if (category.textContent === "School") {
    category.classList.add("school");
  } else if (category.textContent === "Work") {
    category.classList.add("work");
  } else if (category.textContent === "Home") {
    category.classList.add("home");
  } else if (category.textContent === "Other") {
    category.classList.add("other");
  }
}
