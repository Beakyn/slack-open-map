<img src="https://beakyn.com/assets/beakyn-logo-v2-color.png" height="30" />

## Open Map Slack App

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Maintainability](https://api.codeclimate.com/v1/badges/409106d751655cc7ef85/maintainability)](https://codeclimate.com/repos/5c6c0c34f01b0e52cb005973/maintainability)

This is a [Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/intro/) project and is set up to run on AWS.

**Disclaimer**: We do prefer using [Yarn](https://yarnpkg.com/en/docs/install) to install dependencies, so that's what we're going to use in this documentation.

After cloning the repository:

1. Make sure you have the Serverless Framework installed globally. Run: `yarn global add serverless`.
2. On the project directory run `yarn` to install local dependencies.
3. Make sure you have a `.env` file with the right environment variables set up.

### Running locally for development

This project uses the plugin `serverless-offline` to simulate the lambdas on a local server.

Run the server with: `yarn dev`.
