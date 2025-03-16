const apiconfig = {
  development: {
    endpointAPI: "https://localhost:8443/api/v1",
    endpointWS: "ws://localhost:3071",
  },
  production: {
    hosturl: "https://lab-parse-server.se-rmutl.net/api",
    wsurl: "wss://lab-parse-server.se-rmutl.net",
  },
};
module.exports = apiconfig;
