# juste un serveur web qui bind sur /dist. 
# build et serve /dist
# npm i 
# npm run tests. 
# npm run build. 
# FROM nginx
FROM alpine

# RUN apk update \
#     && apk add bash nginx nodejs npm

ARG ENVIRONMENT
ENV ENVIRONMENT $ENVIRONMENT

RUN apk update \
    && apk add bash nodejs npm wget tar ruby git

# WORKDIR /usr/aafm-front/
# COPY ./ /usr/aafm-front/



RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
RUN tar xvzf ./ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin
RUN ngrok authtoken 2d2tYywVfCAEuGTDoAnG3ymWCt2_7P6AyD2FE9d3QTA764Xad

RUN gem install sinatra
RUN gem install rackup
# RUN gem install json

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
# RUN rm -rf dist/
# RUN rm -rf node_modules
# RUN npm i
# RUN npm run test -- -u
# RUN npm run test
# RUN npm run build
# RUN mv dist/ /var/www/
# RUN nginx -g "daemon  off;"

# CMD ["ash","-c",'nginx -g "daemon  off;"']
# CMD ["nginx","-g",'"daemon  off;"']
# ENTRYPOINT nginx -g 'daemon off;' 