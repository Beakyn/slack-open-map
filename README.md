<img src="https://beakyn.com/assets/beakyn-logo-v2-color.png" height="40" />

## Open Map Slack App

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Maintainability](https://api.codeclimate.com/v1/badges/e68dbdd901c382f7571d/maintainability)](https://codeclimate.com/github/Beakyn/slack-open-map/maintainability)

This is a [Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/intro/) project and is set up to run on AWS.

**Disclaimer**: We do prefer using [Yarn](https://yarnpkg.com/en/docs/install) to install dependencies, so that's what we're going to use in this documentation.

After cloning the repository:

1. Make sure you have the Serverless Framework installed globally. Run: `yarn global add serverless`.
2. On the project directory run `yarn` to install local dependencies.
3. Make sure you have a `.env` file with the right environment variables set up.

### Running locally for development

This project uses the plugin `serverless-offline` to simulate the lambdas on a local server.

Run the server with: `yarn dev`.
