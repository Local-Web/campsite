const regex = /^(?<person>.*) has left the chat/;

exports.LeftChat = (raw) => {
  let matches = raw.match(regex);

  if (matches) {
    return matches.groups.person;
  }

  return false;
};
