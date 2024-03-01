#!/bin/bash

# Port sur lequel le serveur écoute les webhooks
webhook_port=8089

# Répertoire du projet
project_dir="/usr/aafm-front"

cp -r /usr/aafm-front/.cicd/ /tmp/.cicd/

gitsetup(){
  . /tmp/.cicd/gitsetup.sh
}

build(){
  . /tmp/.cicd/build.sh
}

listen(){
  . /tmp/.cicd/listen.sh
}

gitsetup
# build
listen
