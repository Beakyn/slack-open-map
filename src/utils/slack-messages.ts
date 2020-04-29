export const openBlock = (fileId, fileName) =>
  JSON.stringify([
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Looks like the file you just shared has location data. \n\n\`${fileName}\`\n\nWould you like to visualize it on a map?`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Yes',
            emoji: true,
          },
          style: 'primary',
          value: fileId,
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'No',
            emoji: true,
          },
          value: 'CANCEL',
        },
      ],
    },
  ]);

export const instructionsBlock = (url) =>
  JSON.stringify([
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Great!\n\n 1. Right click on this link and copy it: \`${url}\`.\n 2. Go to https://kepler.gl/demo\n 3. Select the tab \"Load Map using URL\"\n 4. Paste the link and press "Fetch". \n\n The file will be deleted in 24hr from our server and the link will stop working. If you want to keep the map be sure to export it in Kepler.`,
      },
    },
  ]);
