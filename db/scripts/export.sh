#!/bin/sh
cat - | jq  -r '.messages[] | [.sender, .subject, .message, .time_sent] | @csv'

