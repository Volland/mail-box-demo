const { query } = require('../db-provider');
const getMessagesPaginated = (limit , queryType , fromId , fromStamp) => {
    if(limit < 1) {
        throw Error('Invalid limit ')
    }
    const isFirstPageQuery = fromStamp && fromId;
    console.log('!!!!!!', isFirstPageQuery);
    const queryString = (sqlQueries.get[ queryType === 'archived'? 'archived':'all'] ||{})[isFirstPageQuery? 'firstPage':  'continuePage'];
    if(!queryString) {
        throw Error('No Query found');
    }
    console.log(queryString);
    return query(sqlQueries.get.all.firstPage, [limit] ).then(data => data).catch(e => console.log(e))

};
const getMessageById = id => {
    if(!id) {
        throw Error('Id is required ')
    }
   return query(sqlQueries.get.item, [id])
};
const updateStatus = (id , isRead, isArchived) => {
    if (!id) {
        throw Error('Id is required ')
    }

    const hasIsRead = isBool(isRead) ;
    const hasIsArchived = isBool(isArchived);

    if (!hasIsRead && ! hasIsArchived ) {
        throw Error ('No Update arguments provided ')
    }
    if (hasIsRead && hasIsArchived) {
        return query(sqlQueries.update.status, [id, isRead, isArchived])
    }
    if(hasIsRead) {
        return query(sqlQueries.update.isRead, [id, isRead])
    }
    if (hasIsArchived) {
        return query(sqlQueries.update.isArchived, [id, isArchived])
    }
};

const isBool = x => typeof(x) == typeof(true);
const  sqlQueries = {
    get:{
        all:{
            firstPage:
                `select id, subject, sender, message,  send_at , is_readed, is_archived 
                      from public.messages 
                      where send_at < extract(epoch from now() at time zone 'utc') 
                      order by send_at desc, id desc 
                      limit $1`
            ,
            continuePage: `select id, subject, sender, message,  send_at , is_readed, is_archived 
                              from public.messages 
                              where (send_at > $2 OR (send_at = $2 AND id > $3)
                                 and   send_at < extract(epoch from now() at time zone 'utc') 
                              order by send_at desc, id desc 
                              limit $1`
        },
        archived:{
            firstPage: `select id, subject, sender, message,  send_at , is_readed 
                      from messages 
                      where 
                         is_archived = TRUE
                         send_at < extract(epoch from now() at time zone 'utc') 
                      order by send_at desc, id desc 
                      limit $1`,
            continuePage: `select id, subject, sender, message,  send_at , is_read, is_archived
                              from public.messages 
                              where  is_archived = TRUE 
                                 and (send_at > $2 OR (send_at = $2 AND id > $3)
                                 and   send_at < extract(epoch from now() at time zone 'utc') 
                              order by send_at desc, id desc 
                              limit $1`
        },
        item : `select id, subject, sender, message,  send_at , is_read 
                      from messages 
                      where id = $1`
    },
    update : {
        isRead:`update public.message set is_readed = $2 
                      where id = $1 AND is_readed <> $2`,
        isArchived: `update public.message set is_archived = $2 , is_readed = $3
                           where id = $1 AND is_archived <> $2`,
        status: `update public.message set is_archived = $2 
                           where id = $1 AND (is_archived <> $2 or is_readed <> $3)`

    }
};

module.exports = {
    getMessagesPaginated, getMessageById, updateStatus
};