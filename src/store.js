function mixer() {
}

const initialState = {
  inbox: []
};

function messages(state = initialState, action) {
  console.log('Redux action received: <' + action.type + '>');
  switch (action.type) {
    case 'INBOX_MESSAGES':
      const { ids, messages } = action.data
      const inbox = ids.map(id => messages[id]).filter(msg => 'sms_in' === msg.type);
      return { inbox };
    default:
      return state;
  }
}

const store = Redux.createStore(Redux.combineReducers({
  messages,
}));
