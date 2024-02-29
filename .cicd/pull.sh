# Setup Git Config
echo "Setting Git Config Values"
git config --global user.email "developer@domain.com" && \
    git config --global user.name "Docker Image"

# Setup Git Folders
echo "Adding Host Key for Github"
cd /home/my_user/ \
  && ssh-keyscan gitlabdomain.com > /home/my_user/.ssh/known_hosts

# Add ssh-key to SSH Agent
echo "Adding SSH Key to ssh-agent" \
  && eval `ssh-agent -s` && ssh-add /home/my_user/.ssh/id_rsa