#!/bin/sh
echo $1 $2 $3
echo "CREATE DATABASE mailboxtest;" |  PGPASSWORD=postgres psql  -h $1 -p 5432 -U postgres -f -
DATABASE_HOST=$1  PGPASSWORD=postgres psql -p 5432 -d mailboxtest  -h $1 -U  postgres -f $2
#cat $3 | jq  -r '.messages[] | [.time_sent, .sender, .subject, .message ]  | @csv' | sort -k1n  |  psql -h $1 -p 5432 -d mailboxtest -U postgres -c "COPY public.messages (send_at, sender, subject, message) from stdin  with (format CSV )"