const bodyParser = require('body-parser');
const jsonParser = bodyParser.text({ type: 'application/json'});
const validate  = require('../validators/schema-validator');
const pino = require('pino')();

const customParseValidate = shemaName => (req, res , next) => {
    try {
        const parsedObject = JSON.parse(req.body);
        if(shemaName) {
            try {
                const validationResults = validate(shemaName, parsedObject);
                if(validationResults.isValid) {
                    req.body = parsedObject;
                    next();
                }  else {
                    return res.status(405).json({
                        type: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405`,
                        title: 'Invalid request body ',
                        status: 405,
                        details: `Invalid request json body ${req.body} Error : '${validationResults.errorMessage}'`
                    });
                }
            } catch (ev) {
                pino.error(ev);
            }
        }
    } catch (e) {
        pino.error(e);
        return res.status(405).json({
            type: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405`,
            title: 'Invalid request body ',
            status: 405,
            details: `Invalid request json body ${req.body} Error ${JSON.stringify(e)}`
        });
    }
};
const registerBodyValidator = (schemaName) => [jsonParser, customParseValidate(schemaName)];

module.exports  = registerBodyValidator;
