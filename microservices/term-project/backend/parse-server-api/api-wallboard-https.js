const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
var cors = require('cors');
var fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

var apiport = 4000;

const config = {
  databaseURI: 'mongodb://wallboarduser:WB1qazxsw2@192.168.56.106:27017/wallboarddb',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',

  appId: process.env.APP_ID || 'wallboardapi',
  masterKey: process.env.MASTER_KEY || 'wallboardapi', //Add your master key here. Keep it secret!
  clientKey: 'wallboardapi',
  javascriptKey: 'wallboardapi',

  serverURL: 'https://192.168.56.1:' + apiport + '/api', // Don't forget to change to https if needed
  publicServerURL: 'https://192.168.56.1:' + apiport + '/api',
  liveQuery: {
    classNames: ['OnlineAgentLists', 'WallboardBanners','CallAgentSummaries'], // List of classes to support for query subscriptions
  },
  masterKeyIps: ["0.0.0.0/0","::/0"],
  useMasterKey: true,
  allowClientClassCreation: false,
  allowExpriredAuthDataToken: false,
  encodeParseObjectInCloudFunction: false
  
};

const app = express();

app.use(cors());
app.use(cors({ origin: '*' }))

// Serve static assets from the /public folder
app.use('/', express.static(path.join(__dirname, '/wallboard')));

// Serve the Parse API on the /parse URL prefix
const mountPath = '/api';
const api = new ParseServer(config);

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

api.start();

//app.use(mountPath, api);
app.use(mountPath, api.app);

var httpsServer = require('https').createServer(options, app);

httpsServer.listen(apiport, function () {
  console.log('Wallboard API running on port ' + apiport + '.');
});

ParseServer.createLiveQueryServer(httpsServer);
