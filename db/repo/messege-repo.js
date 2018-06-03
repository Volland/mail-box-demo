const { query } = require('../db-provider');
const  sqlQueries = {
    getPaginatedStart = `select subject, sender, id , send_at 
                              from messages 
                              where send_at < extract(epoch from now() at time zone 'utc') 
                              order by send_at desc, id desc 
                              limit :limit`,
    getPaginatedContinue = `select subject, sender, id , send_at 
                              from public.messages 
                              where (send_at > T OR (send_at = :continue_t AND id > :continue_id)
                                 and   send_at < extract(epoch from now() at time zone 'utc') 
                              order by send_at desc, id desc 
                              limit :limit`
};

const getPaginated = ({query, limit, continue_token:{id ,  sendAt}}) => {

}