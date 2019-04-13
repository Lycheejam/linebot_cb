const Client = require('@line/bot-sdk').Client;

exports.handler = (event, context, callback) => {
  let client = new Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
  });
  
  let message = '';
  
  if (event.detail['build-status'] === 'SUCCEEDED') {
    message = event.time + '\n'
            + 'プロジェクト名：' + event.detail['project-name'] + '\n'
            + 'ステータス：ビルド成功' + '\n';
  } else if (event.detail['build-status'] === 'FAILED') {
    message = event.time + '\n'
            + 'プロジェクト名：' + event.detail['project-name'] + '\n'
            + 'ステータス：ビルド失敗' + '\n';
  } else if (event.detail['build-status'] === 'STOPPED') {
    message = event.time + '\n'
            + 'プロジェクト名：' + event.detail['project-name'] + '\n'
            + 'ステータス：ビルド停止' + '\n';
  }
  
  client.pushMessage(process.env.USERID, { type: 'text', text: message });
};