import * as qs from 'querystring';
import {formatResponseObject} from '../utils/response';
import {slackFileInfo, slackPostMessage, slackDeleteMessage, slackGetFile} from '../utils/slack';
import {instructionsBlock} from '../utils/message-blocks';
import shortId from '../utils/shortid';
import {putS3Object} from '../utils/aws-s3';

const {ROOT_URL} = process.env;

export const actionCatch = async (event) => {
  const parsedBody = qs.decode(event.body);
  const payload: any = parsedBody.payload;
  const body = JSON.parse(payload);

  console.log('TYPE ====>', body);

  try {
    // Cache action value
    const value = body.actions[0]?.value;

    console.log('value ', value);

    // Cache channel id
    const channel = body.channel.id;

    // Cache message time stamp
    const ts = body.message.ts;

    // If the user cancels, do nothing
    if (value === 'CANCEL') {
      // Delete open block
      await slackDeleteMessage(channel, ts);

      return formatResponseObject({action: 'CANCELED'});
    }

    // If the user says YES, proceed.

    // Get file info using the Slack API
    const fileInfo = await slackFileInfo(value);

    // Download file and cache it
    const fileContent = await slackGetFile(fileInfo.url_private_download);

    // Create a short id for the file name in S3
    const id = shortId();

    // Upload file to S3
    const s3PutObject = await putS3Object(id, fileContent, fileInfo.pretty_type);

    // Cache the file URL
    const url = `${ROOT_URL}/${id}.${fileInfo.pretty_type.toLowerCase()}`;

    console.log('s3PutObject  =>', s3PutObject);

    // Cache instructions block
    const block = instructionsBlock(url);

    await Promise.all([
      // Delete open block
      slackDeleteMessage(channel, ts),

      // Push the instructions block message
      slackPostMessage(channel, block),
    ])

    return formatResponseObject({message: 'ok'});
  } catch (error) {
    throw new Error(error);
  }
};

export default actionCatch;