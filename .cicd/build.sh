echo "build task started. this will take a while." 
# chmod -r 777 /usr/aafm-front
rm -rf /usr/aafm-front-build
cp -r /usr/aafm-front /usr/aafm-front-build

cd /usr/aafm-front-build

rm -rf dist/
rm -rf node_modules

npm i
npm run test -- -u
npm run test
npm run build

cd /usr/aafm-front
rm -rf dist/
cp -r /usr/aafm-front-build/dist /usr/aafm-front/dist
echo "all good."