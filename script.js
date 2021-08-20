const todos = JSON.parse(localStorage.getItem("todos")) || [];
const todosElement = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");
function removeTodo(index) {
  todos.splice(index, 1);
  render();
  localStorage.setItem("todos", JSON.stringify(todos));
}
function editTodo(index){
  console.log('Edit Click');
}
function handleChange(index) {
  const prevState = todos[index].completed;
  todos[index].completed = !prevState;
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function render(_todos = todos) {
  let html = "";
  _todos.forEach((todo, i) => {
    html =
      html +
      `<li>
        ${
          todo.completed
            ? `<label class="toto-container"> <input type='checkbox' checked onclick='handleChange(${i})' />
            <span class="checkmark"></span> </label>`
            : `<label class="toto-container"><input type='checkbox' onclick='handleChange(${i})' />
            <span class="checkmark"></span></label>`
        }
        <span class=${todo.completed ? "line-strike" : ""}>${todo.title}</span>
        <span onclick="editTodo(${i})"><i class="far fa-edit ml-3"></i></span>
        <span onclick="removeTodo(${i})"><i class="far fa-times-circle ml-3" style="font-size:20px"></i></span>
      </li>`;
  });

  todosElement.innerHTML = html;
}

render();

function addTodo(event) {
  event.preventDefault();

  const newTodo = input.value;
  todos.push({ title: newTodo, completed: false });
  render();
  input.value = "";

  localStorage.setItem("todos", JSON.stringify(todos));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
    if (document.querySelector("#myInput").value.length == 0) {
      alert("Todo item is required !");
    }
    else{
      addTodo(event);
    }
});

const ul = document.getElementById("todo-list");
const searchInput = document.getElementById('filter_search');
const searchItem = function(event){
  const  keyword = searchInput.value.toLowerCase();
  const filter_item = todos.filter(function(search){
     search = search.title.toLowerCase();
       return search.indexOf(keyword) > -1; 
  });
  render(filter_item);
  console.log(filter_item);
}

searchInput.addEventListener('keyup', searchItem);

