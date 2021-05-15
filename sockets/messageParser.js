const regex = /([^:]*): (.*)/m;

exports.messageParser = (raw) => {
  const [, command, message] = raw.match(regex);
  return { command, message }; 
}