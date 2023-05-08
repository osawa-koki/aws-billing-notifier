import dotenv from 'dotenv';
import { WebClient } from '@slack/web-api';

dotenv.config();

const slack = new WebClient(process.env.SLACK_TOKEN);

const SlackNotifier = async (message: string) => {
  await slack.chat.postMessage({
    channel: process.env.SLACK_CHANNEL || '#general',
    text: message,
  });
}

export default SlackNotifier;
