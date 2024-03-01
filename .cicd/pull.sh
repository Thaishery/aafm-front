cd /usr/aafm-front
# get on Env branch : 
git checkout $ENVIRONMENT
# reset to env head, just in cases ... 
git reset --hard HEAD
# pull . 
git pull