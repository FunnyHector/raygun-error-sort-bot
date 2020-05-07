'use strict';

const newErrorTextPattern = [':bell:', 'New error'];

module.exports = function (app, config, triageStrategy) {
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
    // we don't care if it's not from the Raygun bot
    // TODO: Uncomment this
    // For testing, we don't check the
    // if (message.subtype != "bot_message" && message.bot_id != config.raygunBotId) {
    //   return;
    // }

    // TODO: uncomment this
    // let messageTxt = retrieveNewError(message);
    let messageTxt = await retrieveNewErrorFromAnyone(message);

    console.log(`messageTxt: ${messageTxt}`);

    // we don't care if it's not a new error message
    if (messageTxt == null) {
      return;
    }

    let triageResult = await triageStrategy.triage(messageTxt);

    console.log('triageResult:');
    console.log(triageResult);

    // now we post the message
    let responseMessage = null;
    if (triageResult.keywordFound == null) {
      responseMessage = `No keyword found in the message. This goes to ${triageResult.group} :try_not_to_cry:`;
    } else {
      responseMessage = `Found keyword ${triageResult.keywordFound} in the message, which belongs to ${triageResult.group}`;
    }

    console.log(`responseMessage: ${responseMessage}`);

    await say(responseMessage);
  });

  /**
   * Retrieves the new error posted by Raygun bot.
   *
   * @param {*} message the message in the event. See https://api.slack.com/events/message
   * @returns the message text if it's a new error; null otherwise;
   */
  function retrieveNewError(message) {
    // TODO
  }

  /**
   * Test function to retrieve the new error posted by anyone.
   *
   * @param {*} message
   */
  function retrieveNewErrorFromAnyone(message) {
    console.log("Enter retrieveNewErrorFromAnyone()");

    if (message.text == undefined) {
      console.log("Exit retrieveNewErrorFromAnyone(), message.text == undefined, return null");
      return null;
    }

    if (newErrorTextPattern.every(keyword => message.text.includes(keyword))) {
      console.log(`Exit retrieveNewErrorFromAnyone(), return ${message.text}`);
      return message.text;
    } else {
      console.log("Exit retrieveNewErrorFromAnyone(), !startsWith(newErrorTextPattern), return null");
      return null;
    }
  }
};
