CREATE TABLE IF NOT EXISTS public.messages
(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    subject varchar(200) NOT NULL,
    send_at INTEGER NOT NULL,
    sender varchar(200) NOT NULL,
    message text NOT NULL,
    is_read  boolean NOT NULL DEFAULT FALSE,
    is_archived boolean NOT NULL DEFAULT FALSE

);

CREATE INDEX IF NOT EXISTS index_messages_on_id ON public.messages USING btree (id);
CREATE INDEX IF NOT EXISTS index_messages_on_send_at ON public.messages USING btree (send_at);