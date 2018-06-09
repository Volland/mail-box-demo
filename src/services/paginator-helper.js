const createPaginator = (idKey , stampKey , delimiter = '_') => {
    const parseCursorToData = cursor => {
        const values = cursor ? cursor.split(delimiter).map(x => x.trim()) : [];
        return values.length === 2 ? {id: values[1], stamp: values[0]} : null
    };

    const dataToCursor = data => data && data[idKey] && data[stampKey] ?
         [data[stampKey],data[idKey]].join(delimiter) : null;

    const calculateNextCursor = (limit, data) =>
        (!data || data.length < limit) ? null : dataToCursor(data[data.length -1]);

    return {
        parseCursorToData,
        calculateNextCursor
    }

};
module.exports = { createPaginator };