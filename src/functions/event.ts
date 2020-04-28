import {
  formatResponseObject,
} from '../utils/response';
export const eventCatch = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;

  console.log(JSON.stringify(body));

  try {
    // Return Challenge if asked.
    if (body?.type === 'url_verification')
      return formatResponseObject({challenge: body.challenge});

    /**
     * Get file data to analyze
     */

    console.log(JSON.stringify(body.event))

    const fileId = body.event.type === 'file_shared' ? body.event.file_id : null;

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
