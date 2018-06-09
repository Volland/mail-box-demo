const { updateMessage } = require('../services/message');
const pino = require('pino')();

const tryParse = jsonString => {
    try {
        return JSON.parse(jsonString);
    }
    catch (e) {
        pino.error({error : e} , 'Invalid body');
        return null;
    }
};
const updateMessageHandler = (req, res) => {
    const id = req.params.id;
    const status = tryParse(req.body);
    if(status) {
        return res.status(405).json({
            type : `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405`,
            title: 'Invalid status object',
            status: 405,
            details:`Invalid status object`
        });

    }

    return updateMessage(req.params.id,status).then(result => {
        return res.status(200).json(result);
    }).catch(e => {
        if(e.errors && e.errors.length > 0) {
            return res.status(405).json({
                type : `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404`,
                title: 'Invalid object fields ',
                status: 405,
                details:`Invalid status object ${result.errors.join(' ,  ')}`
            });
        }
        pino.error('Failed to get message ', {error :e});

        return res.status(500).json({
            type : `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500`,
            title: 'Failed to get paginated messages',
            status: 500,
            details:`Failed to get paginated message`
        })
    })
};
module.exports = updateMessageHandler;
