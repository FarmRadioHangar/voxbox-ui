const initialMixerState = {
  channelList: []
};

function mixer(state = initialMixerState, action) {
  switch (action.type) {
    case 'APP_INITIALIZE':
      const { channels } = action.data;
      return {
        channelList: Object.keys(channels).map(key => {
          let channel = channels[key];
          channel.id = key;
          return channel;
        })
      };
    default:
      return state;
  }
}

const initialMessagesState = {
  inbox: []
};

function messages(state = initialMessagesState, action) {
  console.log('Redux action received: <' + action.type + '>');
  switch (action.type) {
    case 'INBOX_MESSAGES':
      const { ids, messages } = action.data;
      const inbox = ids.map(id => messages[id]).filter(msg => 'sms_in' === msg.type);
      return { inbox };
    default:
      return state;
  }
}

const store = Redux.createStore(Redux.combineReducers({
  mixer,
  messages
}));
