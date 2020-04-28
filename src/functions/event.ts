import axios from 'axios';
import * as qs from 'querystring';
import {formatResponseObject} from '../utils/response';

export const eventCatch = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;
  const token = body.token;

  console.log(JSON.stringify(body));

  try {
    // Return Challenge if asked.
    if (body?.type === 'url_verification')
      return formatResponseObject({challenge: body.challenge});

    /**
     * Get file data to analyze
     */

    console.log(JSON.stringify(body))

    const fileId = body.event.type === 'file_shared' ? body.event.file_id : null;
    const userId = body.event.user_id;

    const filesListResponse = await axios({
      method: 'POST',
      url: 'https://slack.com/api/files.list',
      data: qs.stringify({token}),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
        'X-Slack-User': userId,
      },
    });

    console.log(filesListResponse.config);

    console.log(filesListResponse.data);

    if (fileId) {
      console.log('File ID ==> ', fileId);
      // Download file...
    }

    return formatResponseObject(body);
  } catch (error) {
    console.error(error);

    return formatResponseObject(error, error.statusCode);
  }
};

export default eventCatch;
