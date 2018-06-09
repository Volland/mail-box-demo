const { getMessage } = require('../services/message');

const showMessageHandler = (req, res) => {
    return getMessage(req.params.id).then(result => {
        if(!result) {

            return res.status(404).json({
                type : `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404`,
                title: 'No message found ',
                status: 404,
                details:`No message with ${id} found`
            });
        }
        return res.status(200).json(result);
    }).catch(e => {
        pino.error('Failed to get message ', {error :e});

        return res.status(500).json({
            type : `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500`,
            title: 'Failed to get paginated messages',
            status: 500,
            details:`Failed to get paginated message`
        })
    })
};
module.exports = showMessageHandler;
