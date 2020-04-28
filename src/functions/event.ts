import axios from 'axios';
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

    const filesListResponse = await axios({
      method: 'GET',
      url: 'https://slack.com/api/files.list',
      params: {
        token,
      },
    });

    console.log(filesListResponse);

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
