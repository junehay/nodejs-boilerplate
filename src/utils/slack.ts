import axios from 'axios';
import config from '../config';

interface message {
  color: string;
  title: string;
  text?: string;
  ts?: number;
  footer?: string;
}

interface data {
  mrkdwn: boolean;
  attachments: message[];
}

class Slack {
  colors = {
    primary: '#007bff',
    info: '#17a2b8',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545'
  };

  /**
   * @static
   * @summary slack 채널에 메시지 보내는 함수
   * 
   * @param {Array} attachments
   * @param {String} url
   * 
   * @example
   * 
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "Optional text that appears above the attachment block",
            "author_name": "Bobby Tables",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://flickr.com/icons/bobby.jpg",
            "title": "Slack API Documentation",
            "title_link": "https://api.slack.com/",
            "text": "Optional text that appears within the attachment",
            "fields": [
                {
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }
            ],
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }
      ]
   */

  async sendMessage(message: message) {
    const data: data = {
      mrkdwn: true,
      attachments: []
    };

    message.ts = Math.floor(Date.now() / 1000);
    message.footer = `From [${config.env as string}]`;

    data.attachments.push(message);

    await axios.post(`${config.slackURL as string}`, data);
  }
}

export const slack = new Slack();
