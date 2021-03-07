// REDUX code
let todo_id = 0;
const initialState = [{ todos: [], users: [], courses: [] }];
const store = Redux.createStore(reducer, (state = initialState));
const unsubscribe = store.subscribe(() => render(store.getState()));

store.dispatch({ type: "todos/add", payload: { id: newIndex(), name: "learn Angular" } });
store.dispatch({ type: "todos/add", payload: { id: newIndex(), name: "learn Kubernetes" } });
store.dispatch({ type: "todos/add", payload: { id: newIndex(), name: "learn Russian" } });
store.dispatch({ type: "todos/add", payload: { id: newIndex(), name: "learn Haskell" } });
store.dispatch({ type: "todos/add", payload: { id: newIndex(), name: "single swing 40Kg kettlebells" } });

// unsubscribe()

function reducer(state, action) {
  switch (action.type) {
    case "todos/add":
      return applyTodoAdd(state, action.payload);
      break;
    case "todos/delete":
      return applyTodoDelete(state, action.payload);
      break;
    // add other actions here
    default:
      return state;
  }
}

function applyTodoAdd(state, payload) {
  // NB: concat is immutable
  const newState = [{ todos: state[0].todos.concat(payload), users: state[0].users, courses: state[0].courses }];
  return newState;
  //return state.concat(payload);
}
function applyTodoDelete(state, payload) {
  // NB: filter is immutable
  const newState = [
    { todos: state[0].todos.filter(todo => todo.id !== payload.id), users: state[0].users, courses: state[0].courses }
  ];
  return newState;
  // return state.filter(todo => todo.id !== payload.id);
}

// simple todo id creator
function newIndex() {
  todo_id = todo_id + 1;
  return todo_id;
}

// WEB Interface code
function render(state) {
  const todos = state[0].todos;
  const stateToHTML = todos
    .map(
      todo =>
        `<input class='btnDelete red' type='button' onclick='deleteTodo(${todo.id})' value='-'>
        <span class='todo'>${todo.name}</span>`
    )
    .join("<br>");

  const todosHTML = document.getElementById("todos");
  todosHTML.innerHTML = stateToHTML;

  const stateHTML = document.getElementById("state");
  stateHTML.innerHTML = JSON.stringify(state[0], null, 2);
  // stateHTML.innerHTML =
  //   '{<br>"todos":&nbsp;[<br>&nbsp;&nbsp;' +
  //   state[0].todos.map(todo => JSON.stringify(todo)).join(",<br>&nbsp;&nbsp;&nbsp;") +
  //   '<br>],<br>users":[' +
  //   state[0].users.map(todo => JSON.stringify(todo)).join("<br>") +
  //   '], "<br>courses":[' +
  //   state[0].courses.map(todo => JSON.stringify(todo)).join("<br>") +
  //   "]<br>}";
}
function deleteTodo(id) {
  const action = { type: "todos/delete", payload: { id: id } };
  store.dispatch(action);
}
function addTodo() {
  const todo = document.getElementById("mytodo").value;
  document.getElementById("mytodo").value = "";
  const action = { type: "todos/add", payload: { id: newIndex(), name: todo } };
  store.dispatch(action);
}
