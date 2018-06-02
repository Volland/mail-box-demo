const basicAuth = require('express-basic-auth');

module.exports = basicAuth({
    authorizer : (username, password) => username.startsWith('oberlo') && password.startsWith('cool42'),
    unauthorizedResponse: req => req.status(401).send(JSON.stringify({
        type: 'https://httpstatuses.com/401',
        status: 401,
        title : 'invalid credentials',
        details: 'invalid credentials'
    }))
});