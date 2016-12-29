var initialMixerState = {};

function mixer(state, action) {
  if ('undefined' === typeof state) {
    return initialMixerState;
  }
  switch (action.type) {
    case 'APP_INITIALIZE':
      var channels = action.data.channels;
      return {
        channelList: Object.keys(channels).map(function(key) {
          var channel = channels[key];
          channel.id = key;
          return channel;
        })
      };
    default:
      return state;
  }
}

var initialMessagesState = {};

function messages(state, action) {
  if ('undefined' === typeof state) {
    return initialMessagesState;
  }
  switch (action.type) {
    case 'INBOX_RESET':
      return {
        inbox: []
      };
    case 'INBOX_MESSAGES':
      var ids = action.data.ids;
      var messages = action.data.messages;
      return {
        inbox: ids.map(function(id) {
          return messages[id];
        }).filter(function(msg) {
          return 'sms_in' === msg.type;
        })
      };
    default:
      return state;
  }
}

var store = Redux.createStore(Redux.combineReducers({
  mixer: mixer,
  messages: messages,
}));
