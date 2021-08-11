const regex = /^My name is (?<person>.*)/;

exports.MyNameIs = (raw) => {
  let matches = raw.match(regex);

  if (matches) {
    return matches.groups.person;
  }

  return false;
};
