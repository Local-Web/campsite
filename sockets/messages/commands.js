// I should probably get this away from CJS long term, but this should work for now.

// Also, these commands may get substantial enough that it will be necessary to move them to
// individual files. Will look into that later though.
const { people } = require('../records/people');
const { responses } = require('./responses');

let commands = new Map();

const newResponse = (state, response) => {
  return { state: state, response: responses.get(response) };
};

const loggedIn = (username) => {
  return { loggedIn: true, username: username }
};

const loggedOut = () => {
  return { loggedIn: false, username: '' };
};

// `message` in these functions encompasses everything sent from the 
// client to the server
commands.set('join', ({message, state}) => {
  if(state.loggedIn === true) {
    return newResponse(loggedIn(state.username), 'already logged in');
  }

  const person = people.get(message);

  if(!person) {
    return newResponse(loggedOut(), 'user not found')
  }

  // TODO: in a more rigorous scenario, this would first check to make user the user has access.
  return newResponse(loggedIn(message), 'logged in');
});

commands.set('agree', ({message}) => {
  const person = people.get(message);

  if(!person) {
    people.set(message)
    return newResponse(loggedIn(message), 'agreement recorded');
  }

  return newResponse(loggedIn(message), 'agreement already recorded');
});

// commands.set('createRoom', ({message, state}) => {
//   return state;
// });

// commands.set('chat', ({message, state}) => {
//   return state;
// });

exports.commands = commands;