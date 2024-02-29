# juste un serveur web qui bind sur /dist. 
# build et serve /dist
# npm i 
# npm run tests. 
# npm run build. 
# FROM nginx
FROM alpine

ARG ENVIRONMENT
ENV ENVIRONMENT $ENVIRONMENT

RUN apk update \
    && apk add bash nodejs npm wget tar ruby git

RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
RUN tar xvzf ./ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin
RUN ngrok authtoken 2d2tYywVfCAEuGTDoAnG3ymWCt2_7P6AyD2FE9d3QTA764Xad

RUN gem install sinatra
RUN gem install rackup

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]