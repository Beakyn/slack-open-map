import {
  formatResponseObject,
} from '../utils/response';
export const eventCatch = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;

  try {
    console.log(JSON.stringify(body))

    // Return Challenge if asked.
    if (body.event.type === 'url_verification')
      return formatResponseObject({challenge: body.challenge});

    /**
     * Get file data to analyze
     */
    const fileId = body.event?.type === 'file_shared' ? body.event.file_id : null;

    if (fileId) {
      console.log('File ID ==> ', fileId);
      // Download file...
    }

    formatResponseObject(body);
  } catch (error) {
    console.error(error);

    return formatResponseObject(error, error.statusCode);
  }
};

export default eventCatch;
