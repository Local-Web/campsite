let responses = new Map();

responses.set('ok', () => {
  return { sendTo: 'self', message: 'Done!' };
});

responses.set('invalid command', () => {
  return { sendTo: 'self', message: 'That command is not recognized, please try again.' };
});

responses.set('logged in', () => {
  // TODO: add actual agreement here.
  return { sendTo: 'self', message: 'Congratulations, you are logged in!' };
});

responses.set('already logged in', () => {
  // TODO: add actual agreement here.
  return { sendTo: 'self', message: 'You are already logged in' };
});

responses.set('user not found', () => {
  // TODO: add actual agreement here.
  return { sendTo: 'self', message: 'Could not find you in the system, please agree to this agreement' };
});

responses.set('agreement recorded', () => {
  return { sendTo: 'self', message: 'Thank you for agreeing!' };
});

responses.set('agreement already recorded', () => {
  return { sendTo: 'self', message: 'Agreement already recorded, thanks!' };
});

exports.responses = responses;