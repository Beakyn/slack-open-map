import {formatResponseObject} from '../utils/response';
import {slackFileInfo, slackPostMessage} from '../utils/slack';
import {openBlock} from '../utils/message-blocks';

export const eventCatch = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;

  try {
    // Return Challenge if asked
    if (body?.type === 'url_verification')
      return formatResponseObject({challenge: body.challenge});

    // Log the body for debugging
    console.log(JSON.stringify(body))

    // Cache file ID
    const fileId = body.event?.file_id;

    // Get file info using the Slack API
    const fileInfo = await slackFileInfo(fileId);

    // Cache the channel ID
    const channelId = fileInfo.groups[0];

    // Only post `openBlock` if the file is a CSV, JSON or GeoJSON.
    if (['CSV', 'JSON', 'GEOJSON'].includes(fileInfo.pretty_type)) {
      // TODO: Validate that contains location data.

      const block = openBlock(fileId, fileInfo.name);

      await slackPostMessage(channelId, block);
    }

    return formatResponseObject(body);
  } catch (error) {
    console.error(error);

    return formatResponseObject(error, error.statusCode);
  }
};

export default eventCatch;
