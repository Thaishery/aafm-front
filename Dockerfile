# juste un serveur web qui bind sur /dist. 
# build et serve /dist
# npm i 
# npm run tests. 
# npm run build. 
# FROM nginx
FROM alpine

RUN apk update \
    && apk add bash nginx nodejs npm

WORKDIR /usr/aafm-front/
COPY ./ /usr/aafm-front/
RUN rm -rf dist/
RUN rm -rf node_modules
RUN npm i
RUN npm run test -- -u
RUN npm run test
RUN npm run build
RUN mv dist/ /var/www/
# RUN nginx -g "daemon  off;"

# CMD ["ash","-c",'nginx -g "daemon  off;"']
# CMD ["nginx","-g",'"daemon  off;"']
ENTRYPOINT nginx -g 'daemon off;' 