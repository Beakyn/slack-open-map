const fs = require('fs');

import axios from 'axios';
import * as qs from 'querystring';
import {formatResponseObject} from '../utils/response';
import {openBlock} from '../utils/message-blocks';

const {SLACK_APP_TOKEN, SLACK_BOT_TOKEN} = process.env;

export const eventCatch = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;

  try {
    // Return Challenge if asked.
    if (body?.type === 'url_verification')
      return formatResponseObject({challenge: body.challenge});

    /**
     * Get file data to analyze
     */
    console.log(JSON.stringify(body))

    const fileId = body.event?.file_id;
    const fileInfoResponse = await axios({
      method: 'POST',
      url: 'https://slack.com/api/files.info',
      data: qs.stringify({
        token: SLACK_APP_TOKEN,
        file: fileId,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const fileInfo = fileInfoResponse.data.file;
    const channelId = fileInfoResponse.data.file.groups[0];

    /**
     * If file isn't CSV, JSON or GeoJSON return
     */
    if (['CSV', 'JSON', 'GEOJSON'].includes(fileInfo.pretty_type)) {
      const postMessageResponse = await axios({
        method: 'POST',
        url: 'https://slack.com/api/chat.postMessage',
        data: qs.stringify({
          token: SLACK_BOT_TOKEN,
          channel: channelId,
          text: 'Hello World',
          blocks: openBlock(fileId, fileInfo.name),
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });

      console.log(postMessageResponse.data);
    }

    // console.log('Axios Config =>', fileInfoResponse.config);
    // console.log('File ID =>', fileInfoResponse.data);

    /**
     * Upload content to S3 bucket. Save with original file name.
     * Return public URL.
     */

    /**
     *
     */

    return formatResponseObject(body);
  } catch (error) {
    console.error(error);

    return formatResponseObject(error, error.statusCode);
  }
};

export default eventCatch;
