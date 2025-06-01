const fs = require('fs');
const path = require('path');

module.exports = async function (context, req) {
  // Azure Static Web Apps で認証情報は x-ms-client-principal ヘッダーに入る
  const principal = req.headers['x-ms-client-principal'];
  if (!principal) {
    context.res = {
      status: 401,
      body: "Unauthorized"
    };
    return;
  }

  // CSVファイルのパス
  const csvPath = path.join(__dirname, 'test.csv');
  if (!fs.existsSync(csvPath)) {
    context.res = {
      status: 404,
      body: "File not found"
    };
    return;
  }

  const csv = fs.readFileSync(csvPath, 'utf8');
  context.res = {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="test.csv"'
    },
    body: csv
  };
};