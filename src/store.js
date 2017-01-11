var initialMixerState = {
  channelList: [],
};

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
        }),
      };
    case 'CHANNEL_UPDATE':
      var channels = state.channelList;
      return {
        channelList: channels.map(function(channel) {
          if (action.data.hasOwnProperty(channel.id)) {
            var key = channel.id;
            channel = action.data[key];
            channel.id = key;
          } 
          return channel;
        }),
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
      var ids = action.data.ids,
          inbox  = [],
          outbox = [];
      ids.forEach(function(id) {
        var message = action.data.messages[id];
        if ('sms_in' === message.type) {
          inbox.push(message);
        } else {
          outbox.push(message);
        }
      });
      return { inbox: inbox, outbox: outbox, };
    default:
      return state;
  }
}

var store = Redux.createStore(Redux.combineReducers({
  mixer: mixer,
  messages: messages,
}));
