const regex = /^My name is (?<person>.*?)\.(?<host> I am the host\.)?/;

exports.MyNameIs = (raw) => {
  let matches = raw.match(regex);

  if (matches) {
    return { name: matches.groups.person, host: !!matches.groups.host };
  }

  return false;
};
