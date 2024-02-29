#!/bin/bash

# Port sur lequel le serveur écoute les webhooks
webhook_port=8089

# Répertoire du projet
project_dir="/usr/aafm-front"
echo $ENVIRONMENT

# Setup Git Config
echo "Setting Git Config Values"
git config --global user.email "developer@domain.com" && \
    git config --global user.name "Docker Image"

# Setup Git Folders
echo "Adding Host Key for Github"
cd $HOME_DIR \
  && ssh-keyscan gitlabdomain.com > /home/my_user/.ssh/known_hosts

# Add ssh-key to SSH Agent
echo "Adding SSH Key to ssh-agent" \
  && eval `ssh-agent -s` && ssh-add /home/my_user/.ssh/id_rsa

ssh -T git@github.com

deploy(){
  . /usr/aafm-front/.cicd/build.sh
}

listen(){
  . /usr/aafm-front/.cicd/listen.sh
}

# deploy
listen
