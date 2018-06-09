const { getMessages } = require("../services/message.js");
const url = require('url');
const { toGetPagesQueryParams } = require("../converters/request-to-query-params");
const pino = require('pino')();
const referenceUrl = (req , params) =>  url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: url.parse(req.originalUrl).pathname,
      query: Object.assign({}, req.query, {
          limit: params.limit,
          q: params.filter,
          continue: params.cursor,
      })
  });

const getMessageHandler = (req, res) => {
    const query = toGetPagesQueryParams(req);
    if(query.errors && query.errors.length > 0) {
        return res.status(400).json({
            type : `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400`,
            title: 'Invalid query request',
            status: 400,
            details:`Invalid request : ${query.errors.map(i => ` ${i.param} : ${i.message }`).join(' ; ')}`
        });
    }

    return getMessages(query.limit , query.filter , query.cursor).then(result => {
        const self = referenceUrl(req, query);
        const payload = {self, limit: query.limit , messages : result.messages};

        if (result.nextCursor) {
            payload.next = referenceUrl(req, Object.assign({}, query, {cursor: result.nextCursor }))
        }
        return res.status(200).json(payload);
    }).catch(e => {
        pino.error('Failed to get paginated messages ', {error :e});
        return res.status(500).json({
            type : `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500`,
            title: 'Failed to get paginated messages',
            status: 500,
            details:`Failed to get paginated messages for params : ${JSON.stringify(query)}`
        })
    })
};


module.exports = getMessageHandler;
