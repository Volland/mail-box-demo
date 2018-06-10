const pino = require('pino')();
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const defaultShemaFolder = './schemas/';
const fs = require('fs');
const path = require('path');

const getSchemaName = p => path.parse(p).name;
const isJson = p => path.parse(p).ext === '.json';


const init = (schemaFolder)  => {

    const fullSchemaFolder = path.resolve(__dirname, schemaFolder);

    fs.readdirSync(path.resolve(__dirname,schemaFolder)).forEach(file => {
        const fullPathSchema = path.resolve(fullSchemaFolder, file);
        if (isJson(fullPathSchema)) {
            console.log(fullPathSchema);
             try {
                const content = fs.readFileSync(fullPathSchema, 'utf8');
                try {
                    const schemaObject = JSON.parse(content);
                    try {
                        ajv.addSchema(schemaObject, getSchemaName(fullPathSchema));
                    }
                    catch (registere) {
                        pino.error('Failed to register schema file  ', {error: eparse});
                    }
                }
                catch (eparse) {
                    pino.error('Failed to parse schema file  ',  JSON.stringify(eparse));
                }
            }
            catch (eread) {
                pino.error('Failed to read schema file  ', JSON.stringify(eread));
            }
        }
    });
};
init(defaultShemaFolder);

const validate = (shemaName , data) => {
    const isValid = ajv.validate(shemaName, data);
    return {
        isValid: isValid,
        errors: !isValid ? ajv.errors : [],
        errorMessage: !isValid ? ajv.errorsText() : null
    }
};
module.exports = validate;

/**
 * curl -X PATCH "http://localhost:8080/api/messages/6" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"is_read\": true, \"is_archived\": true}"
*/