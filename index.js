const store = Redux.createStore(reducer, (state = []));
const unsubscribe = store.subscribe(() => {
  console.log("state:", store.getState());
});

store.dispatch({ type: "todos/add", payload: { id: 1, name: "learn Angular" } });
store.dispatch({ type: "todos/add", payload: { id: 2, name: "learn Kubernetes" } });
store.dispatch({ type: "todos/add", payload: { id: 3, name: "learn Russian" } });
store.dispatch({ type: "todos/add", payload: { id: 4, name: "learn Haskell" } });
store.dispatch({ type: "todos/add", payload: { id: 5, name: "single swing 40Kg kettlebells" } });
store.dispatch({ type: "todos/delete", payload: { id: 3 } });
store.dispatch({ type: "todos/delete", payload: { id: 2 } });

unsubscribe();

function reducer(state, action) {
  switch (action.type) {
    case "todos/add":
      return applyTodoAdd(state, action.payload);
      break;
    case "todos/delete":
      return applyTodoDelete(state, action.payload);
      break;
    // add other action here
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
