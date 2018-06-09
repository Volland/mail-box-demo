const DEFAULT_LIMIT = 10;
const MAX_LIMIT = DEFAULT_LIMIT * 10;
const DEFAULT_FILTER = 'all';
const FILTER_OPTIONS = [DEFAULT_FILTER, 'archived'];
const cursorRegExp = /^\d+_\d+$/;

const toGetPagesQueryParams = (request) => {
     const errors = [];

     const limit = !!request.query.limit ? request.query.limit * 1 : DEFAULT_LIMIT;
     if(isNaN(limit)) {
         errors.push({param:'limit', message: `Invalid Limit value ${request.query.limit}`});
     }

     if((limit < 1) || (limit > MAX_LIMIT)) {
         errors.push({param: 'limit', message: `Invalid Limit range from 1 to ${MAX_LIMIT} current ${limit}`});
     }

     const filter = !!request.query.q ? request.query.q : DEFAULT_FILTER;

     if(FILTER_OPTIONS.indexOf(filter) === -1) {
         errors.push({param : 'q', message:`filter option not exist`})
     }

     const cursor = request.query.continue;
     if(cursor && !cursorRegExp.test(cursor)) {
         errors.push({param : 'continue' , message: 'Invalid continue token'})
     }

     return {
         limit,
         filter,
         cursor,
         errors
     }
};

module.exports = {
    toGetPagesQueryParams,
};