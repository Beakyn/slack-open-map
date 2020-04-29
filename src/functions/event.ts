import {putS3Object} from '../utils/aws-s3';
import {formatResponseObject} from '../utils/response';
import shortId from '../utils/shortid';
import {openBlock} from '../utils/slack-messages';
import {slackFileInfo, slackGetFile, slackPostMessage} from '../utils/slack-utils';

const {ROOT_URL} = process.env;

const uploadFileAndGetUrl = async (fileContent, fileType) => {
  // Create a short id for the file name in S3
  const id = shortId();

  // Upload file to S3
  await putS3Object(id, fileContent, fileType);

  // Return the file URL
  return `${ROOT_URL}/${id}.${fileType}`;
};

export const eventCatch = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;

  console.log('===========================');

  try {
    // Return Challenge if asked
    if (body?.type === 'url_verification') return formatResponseObject({challenge: body.challenge});

    // Log the body for debugging
    console.log(JSON.stringify(body));

    // Cache file ID
    const fileId = body.event?.file_id;

    // Get file info using the Slack API
    const fileInfo = await slackFileInfo(fileId);

    // Cache file type
    const fileType = fileInfo.pretty_type.toLowerCase();

    // Cache the channel ID
    const channelId = fileInfo.groups[0];

    // Only post `openBlock` if the file is a CSV, JSON or GeoJSON.
    if (['csv', 'json', 'geojson'].includes(fileType)) {
      // Download file and cache it
      const fileContent = await slackGetFile(fileInfo.url_private_download);

      // Validation boolean
      let fileIsValid = true;

      if (!fileIsValid) return formatResponseObject(body);

      // TODO: Validate that contains location data.

      // Cache the file URL
      const url = await uploadFileAndGetUrl(fileContent, fileType);

      const block = openBlock(url, fileInfo.name);

      await slackPostMessage(channelId, block);
    }

    return formatResponseObject(body);
  } catch (error) {
    console.error(error);

    return formatResponseObject(error, error.statusCode);
  }
};

export default eventCatch;
