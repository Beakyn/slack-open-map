import axios from 'axios';
import * as qs from 'querystring';

const {SLACK_BOT_TOKEN} = process.env;

export const slackFileInfo = async (file: string) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://slack.com/api/files.info',
      data: qs.stringify({
        token: SLACK_BOT_TOKEN,
        file: file,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data.file;
  } catch (error) {
    throw new Error(error);
  }
};

export const slackPostMessage = async (channel: string, blocks) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://slack.com/api/chat.postMessage',
      data: qs.stringify({
        token: SLACK_BOT_TOKEN,
        text: 'Open Map',
        channel,
        blocks,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const slackDeleteMessage = async (channel: string, ts: string) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://slack.com/api/chat.delete',
      data: qs.stringify({
        token: SLACK_BOT_TOKEN,
        channel: channel,
        ts,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const slackGetFile = async (url: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${SLACK_BOT_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
