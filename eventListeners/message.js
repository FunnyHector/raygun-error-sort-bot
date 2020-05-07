'use strict';

module.exports = function(app, config) {
  /**
   * Pseudo code:
   * 1. listen to the message that matches the following criteria (make the criteria configurable/extendable):
   *   - message.subtype == "bot_message" | https://api.slack.com/events/message/bot_message)
   *   - message.bot_id == "B0126RJ6XDY" | This id shouldn't change. Put it into config file.
   *   - message.attachments.any? { |attachment| attachment.has_text && attachment.text.start_with?(":bell: *New error:*") } | ":bell: *New error:*" as a scoped constant
   * 2. We've got a new error message. Retrieve the error message.
   * 3. Compare the error message against the keyword divided into product groups. (maybe make this strategy configurable?)
   *    - if multiple match? a) return the first match, b) return multiple matches (i.e. post to multiple groups)
   * 4. Also post to a channel which serves as the triage history.
   */
  app.message(async ({ message, say }) => {
    await say(`Hello, <@${message.user}>`);
  });
};
