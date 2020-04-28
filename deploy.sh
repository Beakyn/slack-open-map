# This script removes the local auth function from
# the serverless.yml file before deploying to AWS.
# This function its only needed for local testing.

cp serverless.yml serverless-cp.yml
yarn && yarn lint

echo "=> serverless deploy --stage $NODE_ENV"

serverless deploy --stage $NODE_ENV
