#!/bin/bash

# Port sur lequel le serveur écoute les webhooks
webhook_port=8089

# Répertoire du projet
project_dir="/usr/aafm-front"
echo $ENVIRONMENT

deploy(){
  . /usr/aafm-front/.cicd/build.sh
}

listen(){
  . /usr/aafm-front/.cicd/listen.sh
}

# deploy
listen
