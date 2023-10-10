# juste un serveur web qui bind sur /dist. 
# build et serve /dist
# npm i 
# npm run tests. 
# npm run build. 
# FROM nginx
FROM node:alpine

WORKDIR /var/www/aafm-front
COPY ./ /var/www/aafm-front/

RUN npm i 

CMD ["npm run", "serve"]