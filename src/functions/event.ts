import {
  formatResponseBodyGet,
  formatResponseObject,
  parseResponseBodyProperties,
} from '../utils/response';
export const eventCatch = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;

  try {
    console.log(JSON.stringify(body))

    // Return response
    return formatResponseObject(body);
  } catch (error) {
    console.error(error);

    return formatResponseObject(error, error.statusCode);
  }
};

export default eventCatch;
