'use strict';

module.exports = {
  // The conversation id should stay the same unless we share this channel to outside of Flux, which seems impossible.
  // May not be needed.
  channelIdToMonitor: 'C012HCAMCAV',
  // The id of the Raygun bot. We only care about messages from this user.
  raygunBotId: 'B0126RJ6XDY',
  // The triage strategy we want to use.
  triageStrategy: 'keyword',
};
