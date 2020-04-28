export const openBlock = (fileId, fileName) => JSON.stringify(
	[
		{
			'type': 'section',
			'text': {
				'type': 'mrkdwn',
				'text': `Looks like the file you just uploaded has location data on it. \n\n\`${fileName}\`\n\nWould you like to visualize it on a map?`
			}
		},
		{
			'type': 'divider'
		},
		{
			'type': 'actions',
			'elements': [
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': 'Yes',
						'emoji': true
					},
					'value': fileId
				},
				{
					'type': 'button',
					'text': {
						'type': 'plain_text',
						'text': 'No',
						'emoji': true
					},
					'value': 'click_me_123'
				}
			]
		}
  ]
);

export const instructionsBlock = (link) => JSON.stringify(
  [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `Great!\n\n 1. Go to https://kepler.gl/demo\n 2. Select the tab: \"Load Map using URL\"\n 3. Paste this url: \`${link}\`. \n\n\n We will delete this data in 24hr, and the link will stop working. If you want to keep the map be sure to export it in Kepler.`,
      }
    }
  ]
)
