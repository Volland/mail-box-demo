const { newMessage } = require('../services/message');
const url = require('url');
const pino = require('pino')();

const createMessageHandler = (req, res) => {
    return newMessage(req.body).then(result => {
        return res.status(201).location(url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: `api/messages/${result.id}`
        })).send();
    }).catch(e => {
        if(e.errors && e.errors.length > 0) {
            return res.status(405).json({
                type : `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405`,
                title: 'Invalid object fields ',
                status: 405,
                details:`Invalid status object ${e.errors.join(' ,  ')}`
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
module.exports = createMessageHandler;
