const helmet = require('helmet');

module.exports = function (server) {

    server.use(
        helmet({
            frameguard: {              
                action: 'deny'
            },
            contentSecurityPolicy: {   
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ['style.com'],
                }
            },
            dnsPrefetchControl: false
        }))

}