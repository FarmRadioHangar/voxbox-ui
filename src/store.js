const initialState = {
  inbox: []
};

function messages(state = initialState, action) {
  console.log('Redux action received: <' + action.type + '>');
  switch (action.type) {
    case 'INBOX_MESSAGES':
      const { ids, messages } = action.data
      const inbox = ids.map(id => messages[id]);
      console.log(inbox);
      return { inbox };
    default:
      return state;
  }
}

const store = Redux.createStore(Redux.combineReducers({
  messages,
}));
