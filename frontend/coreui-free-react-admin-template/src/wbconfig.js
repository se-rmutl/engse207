const wbconfig = {
    development: {
        hosturl  : 'https://lab-parse-server.se-rmutl.net/api',
        wsurl    : 'wss://lab-parse-server.se-rmutl.net',
        masterKey     : 'wallboardapi',
        clientKey     : 'wallboardapi',
        javascriptKey : 'wallboardapi',
        appId : "wallboardapi"
    },
    production: {
        hosturl  : 'https://10.21.43.203:8005/api',
        wsurl    : 'wss://10.21.43.203:8005',
        masterKey     : 'wallboardapi',
        clientKey     : 'wallboardapi',
        javascriptKey : 'wallboardapi',
        appId : "wallboardapi"
    }
};
export default wbconfig;


