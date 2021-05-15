const regex = /([^:]*): (.*)/m;

exports.parser = (raw) => {
  const [, command, message] = raw.match(regex);
  return { command, message }; 
}