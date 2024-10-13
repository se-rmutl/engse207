
const hapi = require('@hapi/hapi');
let express = require('express');
const AuthBearer = require('hapi-auth-bearer-token');
let fs = require('fs');
let cors = require('cors');

const OnlineAgent = require('./repository/OnlineAgent');

const apiconfig = require('./apiconfig')['development'];


//-------------------------------------

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const apiport = 8443

var url = require('url');

//init Express
var app = express();
//init Express Router
var router = express.Router();
//var port = process.env.PORT || 87;

//REST route for GET /status
router.get('/status', function (req, res) {
    res.json({
        status: 'App is running!'
    });
});

//connect path to router
app.use("/", router);


//----------------------------------------------

const init = async () => {
    //process.setMaxListeners(0);
    require('events').defaultMaxListeners = 0;
    process.setMaxListeners(0);

    var fs = require('fs');

    var tls = {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.crt')
    };

    //const server = Hapi.Server({
    const server = hapi.Server({
        port: apiport,
        host: '0.0.0.0',
        tls: tls,
        //routes: {
        //    cors: true
        //}
        routes: {
            cors: {
                origin: ['*'],
                headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                credentials: true
            }
        }

    });

    await server.register(require('@hapi/inert'));

    await server.register(AuthBearer);

    server.auth.strategy('simple', 'bearer-access-token', {
        allowQueryToken: true,              // optional, false by default
        validate: async (request, token, h) => {

            // here is where you validate your token
            // comparing with token from your database for example
            const isValid = token === apiconfig.serverKey;

            const credentials = { token };
            const artifacts = { test: 'info' };

            return { isValid, credentials, artifacts };
        }
    });

    server.auth.default('simple');

    //-- Route ------

    server.route({
        method: 'GET',
        path: '/',
        config: {
            cors: {
                origin: [
                    '*'
                ],
                headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                credentials: true
            }
        },
        handler: async (request, h) => {
            try {
                //console.log('CORS request.info:');
                //console.log(request.info.cors);
                return 'Test Hello, from Endpoint Web Report API.'
            } catch (err) {
                console.dir(err)
            }
        }
    });

    //-------- Code continue here -------------------


    server.route({
        method: 'GET',
        path: '/api/v1/getOnlineAgentByAgentCode',
        config: {
            cors: {
                origin: [
                    '*'
                ],
                headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                credentials: true
            }
        },
        handler: async (request, h) => {
            let param = request.query;

            //console.log(param);
            //console.log("Level: "+param.level);

            try {


                if (param.agentcode == null)

                    //return h.response("Please provide agentcode.").code(400);
                    return h.response({
                        "error": true,
                        "statusCode": 400,
                        "errMessage": "Please provide agentcode."
                    }).code(400);

                else {

                    const responsedata = await OnlineAgent.OnlineAgentRepo.getOnlineAgentByAgentCode(`${param.agentcode}`);

                    if (responsedata.statusCode == 500)
                        return h.response({
                            "error": true,
                            "statusCode": 500,
                            "errMessage": "An internal server error occurred."
                        }).code(500);
                    else
                        if (responsedata.statusCode == 200)
                            return responsedata;
                        else
                            if (responsedata.statusCode == 404)
                                return h.response(responsedata).code(404);
                            else
                                return h.response("Something went wrong. Please try again later.").code(500);

                }
            } catch (err) {
                console.dir(err)
            }
        }

    });



    server.route({
        method: 'POST',
        path: '/api/v1/postOnlineAgentStatus',
        config: {
            cors: {
                origin: [
                    '*'
                ],
                headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                credentials: true
            },
            payload: {
                parse: true,
                allow: ['application/json', 'multipart/form-data'],
                multipart: true  // <== this is important in hapi 19
            }
        },
        handler: async (request, h) => {
            let param = request.payload;

            const AgentCode = param.AgentCode;
            const AgentName = param.AgentName;
            const IsLogin = param.IsLogin;
            const AgentStatus = param.AgentStatus;
            var d = new Date();

            try {

                if (param.AgentCode == null)
                    //return h.response("Please provide agentcode.").code(400);

                    return h.response({
                        "error": true,
                        "statusCode": 400,
                        "errMessage": "Please provide agentcode."
                    }).code(400);

                else {

                    const responsedata = await OnlineAgent.OnlineAgentRepo.postOnlineAgentStatus(AgentCode, AgentName, IsLogin, AgentStatus);

                    if (responsedata.statusCode == 200)
                        return responsedata;
                    else
                        if (responsedata.statusCode == 404)
                            return h.response(responsedata).code(404);
                        else
                            return h.response("Something went wrong. Please try again later.").code(500);

                }

            } catch (err) {
                console.dir(err)
            }

        }

    });


    server.route({
        method: 'POST',
        path: '/api/v1/postSendMessage',
        config: {
            cors: {
                origin: [
                    '*'
                ],
                headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
                additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
                credentials: true
            },
            payload: {
                parse: true,
                allow: ['application/json', 'multipart/form-data'],
                multipart: true  // <== this is important in hapi 19
            }
        },
        handler: async (request, h) => {
            let param = request.payload;

            try {





                

            } catch (err) {
                console.dir(err)
            }

        }

    });


    //----------------------------------------------

    await server.start();
    console.log('Webreport API Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
