module.exports  = (req, res, next) => {
    const id = req.params.id * 1;
    console.log('entity middleware ', id);
    if (isNaN(id) || id <= 0) {
        return res.status(405).json({
            type: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405`,
            title: 'Invalid Id ',
            status: 405,
            details: `Invalid request id ${req.params.id} `
        });
    }
    req.params.id = id ;
    next();
};
