import * as qs from 'querystring';

import {formatResponseObject} from '../utils/response';
import {instructionsBlock} from '../utils/slack-messages';
import {slackDeleteMessage, slackPostMessage} from '../utils/slack-utils';

export const actionCatch = async (event) => {
  const parsedBody = qs.decode(event.body);
  const payload: any = parsedBody.payload;
  const body = JSON.parse(payload);

  console.log(body);

  try {
    // Cache action value
    const value = body.actions[0]?.value;

    // Cache channel id
    const channel = body.channel?.id;

    // Cache message time stamp
    const ts = body.message?.ts;

    // If the user cancels, do nothing
    if (value === 'CANCEL') {
      // Delete open block
      await slackDeleteMessage(channel, ts);

      return formatResponseObject({message: 'CANCELED'});
    }

    /**
     * If the user says YES, proceed.
     */

    // Cache instructions block
    const block = instructionsBlock(value);

    await Promise.all([
      // Delete open block
      slackDeleteMessage(channel, ts),

      // Push the instructions block message
      slackPostMessage(channel, block),
    ]);

    return formatResponseObject({message: 'DONE'});
  } catch (error) {
    throw new Error(error);
  }
};

export default actionCatch;
