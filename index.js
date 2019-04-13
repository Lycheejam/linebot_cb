const Client = require('@line/bot-sdk').Client;

exports.handler = (event, context, callback) => {
  const client = new Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
  });
  
  var message = event.detail['project-name'];
  
  if (event.detail['build-status'] === 'SUCCEEDED') {
    message = message + '\r\n' + 'ビルド成功';
  } else if (event.detail['build-status'] === 'FAILED') {
    message = message + '\r\n' + 'ビルド失敗';
  } else if (event.detail['build-status'] === 'STOPPED') {
    message = message + '\r\n' + 'ビルド停止';
  }
  
  client.pushMessage(process.env.USERID, { type: 'text', text: message });
};