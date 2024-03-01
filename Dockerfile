FROM alpine

#set build args : 
ARG HOME_DIR
ARG NGROK

# RUN echo "Setting up user $USER_ID with home directory: $HOME_DIR" \
# #   && useradd \
# #     --home-dir $HOME_DIR \
# #     --uid 1000 \
# #     $USER_DIR $USER_ID \
# #   && touch ${HOME_DIR}/entrypoint.sh \
#   && mkdir -p ${HOME_DIR}/.ssh/ \
# #   && chown -R ${USER_ID}:${USER_ID} ${HOME_DIR} \
#   && chmod -R 700 ${HOME_DIR}/.ssh \
#   && touch ${HOME_DIR}/.ssh/id_rsa \
#   && chmod 400 ${HOME_DIR}/.ssh/id_rsa 

RUN apk update \
    && apk add bash nodejs npm wget tar ruby git openssh

RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
RUN tar xvzf ./ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin
RUN ngrok authtoken ${NGROK}

RUN gem install sinatra
RUN gem install rackup

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

#set env var: 
ENV ENVIRONMENT $ENVIRONMENT
ENV HOME_DIR $HOME_DIR

ENTRYPOINT ["docker-entrypoint.sh"]