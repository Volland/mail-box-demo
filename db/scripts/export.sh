#!/bin/sh
echo $1 $2 $3
echo "CREATE DATABASE mailboxdev;" |  PGPASSWORD=postgres psql -h $1 -p 5432 -U postgres -f -
DATABASE_HOST=$1  PGPASSWORD=postgres psql -p 5432 -d mailboxdev -h $1 -U postgres -f $2
cat $3 | jq  -r '.messages[] | [.sender, .subject, .message, .time_sent] | @csv' |  psql -h $1 -p 5432 -d mailboxdev -U postgres -c "COPY public.messages (sender, subject, message, send_at) from stdin  with (format CSV )"



