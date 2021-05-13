// I should probably get this away from CJS long term, but this should work for now.

let messageTypes = new Map();

// `message` in these functions encompasses everything sent from the 
// client to the server
messageTypes.set('join', ({message, state}) => {
  // always return the user state. will probably want to return a fresh object here
  // rather than mutating the old one (depending on how FP we want to get.)
  return state;
});

messageTypes.set('agree', ({message, state}) => {
  return state;
});

messageTypes.set('createRoom', ({message, state}) => {
  return state;
});

messageTypes.set('enterRoom', ({message, state}) => {
  return state;
});

messageTypes.set('chat', ({message, state}) => {
  return state;
});

exports.messageTypes = messageTypes;