// REDUX code
let id = 0;
// simple id creator
const getId = () => (id = id + 1);

const store = Redux.createStore(reducer, (state = []));
const unsubscribe = store.subscribe(() => render(store.getState()));

store.dispatch({ type: "todos/add", payload: { id: getId(), name: "learn Angular" } });
store.dispatch({ type: "todos/add", payload: { id: getId(), name: "learn Kubernetes" } });
store.dispatch({ type: "todos/add", payload: { id: getId(), name: "learn Russian" } });
store.dispatch({ type: "todos/add", payload: { id: getId(), name: "learn Haskell" } });
store.dispatch({ type: "todos/add", payload: { id: getId(), name: "single swing 40Kg kettlebells" } });

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
  return state.concat(payload);
}
function applyTodoDelete(state, payload) {
  // NB: filter is immutable
  return state.filter(todo => todo.id !== payload.id);
}

// WEB Interface code
function render(state) {
  const stateToHTML = state
    .map(
      todo =>
        `<input class='btnDelete red' type='button' onclick='deleteTodo(${todo.id})' value='-'>
        <span class='todo'>${todo.name}</span>`
    )
    .join("<br>");

  const todosHTML = document.getElementById("todos");
  todosHTML.innerHTML = stateToHTML;

  const stateHTML = document.getElementById("state");
  stateHTML.innerHTML = state.map(todo => JSON.stringify(todo)).join("<br>");
}
function deleteTodo(id) {
  const action = { type: "todos/delete", payload: { id } };
  store.dispatch(action);
}
function addTodo() {
  const todo = document.getElementById("mytodo").value;
  document.getElementById("mytodo").value = "";
  const action = { type: "todos/add", payload: { id: getId(), name: todo } };
  store.dispatch(action);
}
