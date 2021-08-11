const regex = /([^:]*): (.*)/m;

exports.Message = (raw) => {
  let matches = raw.match(regex);

  if (matches) {
    const [, name, text] = raw.match(regex);
    return { name, text };
  }

  return false;
};
