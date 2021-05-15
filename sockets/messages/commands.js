// I should probably get this away from CJS long term, but this should work for now.

let commands = new Map();

// `message` in these functions encompasses everything sent from the 
// client to the server
commands.set('join', ({message, state}) => {
  // always return the user state. will probably want to return a fresh object here
  // rather than mutating the old one (depending on how FP we want to get.)
  return state;
});

commands.set('agree', ({message, state}) => {
  return state;
});

commands.set('createRoom', ({message, state}) => {
  return state;
});

commands.set('enterRoom', ({message, state}) => {
  return state;
});

commands.set('chat', ({message, state}) => {
  return state;
});

exports.commands = commands;