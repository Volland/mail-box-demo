const { updateMessage, getMessage } = require('../services/message');
const url = require('url');
const pino = require('pino')();

const updateMessageHandler = (req, res) => {
    const id = req.params.id;
    const status = req.body;

    if(!status) {
        return res.status(405).json({
            type : `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405`,
            title: 'Invalid status object',
            status: 405,
            details:`Invalid status object`
        });
    }

    return updateMessage(id, status).then(result => {
        res.location(url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl
        }));
        if(result.affected) {
            return getMessage(req.params.id).then(dataResult => {
                return res.status(200).json(dataResult);
            }).catch(e => {
                return res.status(202).json({e});
            });
        } else {
            res.status(304).send();
        }
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
module.exports = updateMessageHandler;
