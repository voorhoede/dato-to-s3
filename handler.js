'use strict';

const aws = require('aws-sdk');
const basicAuth = require('basic-auth');
const got = require('got');

const s3 = new aws.S3();

const isValidAuthorization = credentials => (
  credentials &&
  credentials.name === process.env.AUTH_USER &&
  credentials.pass === process.env.AUTH_PASSWORD
);

module.exports.main = async (request, context) => {
  if (!isValidAuthorization(
    basicAuth.parse(request.headers['Authorization'])
  )) {
    return { statusCode: 401 };
  }

  return got.post(
    'https://graphql.datocms.com/',
    {
      headers: {
        'Authorization': process.env.DATOCMS_API_TOKEN,
      },
      body: JSON.stringify({
        query: '{ allBlogPosts { title } }'
      }),
    },
  )
    .then(response =>
      s3.putObject({
        Bucket: process.env.BUCKET,
        Key: 'data.json',
        Body: response.body,
      }).promise()
    )
    .then(() => ({ statusCode: 200 }))
    .catch(console.error);
};
