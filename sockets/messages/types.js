// I should probably get this away from CJS long term, but this should work for now.

let types = new Map();

// `message` in these functions encompasses everything sent from the 
// client to the server
types.set('join', ({message, state}) => {
  // always return the user state. will probably want to return a fresh object here
  // rather than mutating the old one (depending on how FP we want to get.)
  return state;
});

types.set('agree', ({message, state}) => {
  return state;
});

types.set('createRoom', ({message, state}) => {
  return state;
});

types.set('enterRoom', ({message, state}) => {
  return state;
});

types.set('chat', ({message, state}) => {
  return state;
});

exports.types = types;