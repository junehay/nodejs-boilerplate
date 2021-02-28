import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  slackURL: process.env.SLACK_URL
};
