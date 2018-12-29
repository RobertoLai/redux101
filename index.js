function reducer(state, action) {
  switch (action.type) {
    case "TODO_ADD":
      return applyTodoAdd(state, action.load);
      break;
    default:
      return state;
  }
}

function applyTodoAdd(state, load) {
  return state.concat(load);
}

const store = Redux.createStore(reducer, []);
const unsubscribe = store.subscribe(() => {
  console.log("STATE:", store.getState());
});

store.dispatch({ type: "TODO_ADD", load: { id: 1, name: "todo 1" } });
store.dispatch({ type: "TODO_ADD", load: { id: 2, name: "todo 2" } });
store.dispatch({ type: "TODO_ADD", load: { id: 3, name: "todo 3" } });

unsubscribe();
