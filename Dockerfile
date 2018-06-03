FROM node:9.11.1-alpine
MAINTAINER Volodymyr Pavlyshyn <pavlyshyn@gmail.com>
COPY . /opt/mail-box
WORKDIR /opt/mail-box
CMD rm -rf node_modules
CMD npm install --only=production
EXPOSE 8080

ENV NODE_ENV production
ENV HOME /tmp
ENTRYPOINT node ./src/server
