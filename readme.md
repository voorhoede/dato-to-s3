# Dato to S3
Fetch data from [DatoCMS](https://datocms.com/) on request and write the data to a JSON file in [Amazon S3](https://aws.amazon.com/s3/), all from an [AWS Lamba](https://aws.amazon.com/lambda/) deployed with the [Serverless Framework](https://serverless.com/framework/).

## Setup (as webhook)
0. Configure [AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/).
1. Create an Amazon S3 bucket that matches the name of `custom.bucket` in the `serverless.yml` file.
2. Create a [DatoCMS API token](https://www.datocms.com/docs/content-delivery-api/#authenticating) and define it as `DATOCMS_API_TOKEN` in a [`.env` file](https://github.com/motdotla/dotenv).
3. Add a [DatoCMS webhook](https://www.datocms.com/docs/introduction/webhooks/) to listen for changes with a HTTP basic auth configuration, define the used authentication name as `AUTH_USER` and password as `AUTH_PASSWORD`.
4. Deploy with `npm run deploy`.
5. Fill in the returned endpoint URL at the DatoCMS webhook.

## Redeploy
Use `npm run deploy:main` for a quick redeploy of the main function instead of redeploying the whole stack.
