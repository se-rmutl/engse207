var dbconfig = {
    web_labDB: {
        server: localhost,
        database:'team0_web_labDB',
        user:'sa',
        password:'',
        port: 1433,
        options:{
            encript: true,
            setTimeout: 12000,
            enableArithAbort: true,
            trustServerCertificate: true,
            trustedconnection:  true,
            instancename:  localhost  // SQL Server instance name
        }
    },

};
module.exports = dbconfig;
