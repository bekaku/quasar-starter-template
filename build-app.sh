#!/bin/bash
rm ./build/quasar-webapp.tar
rm -rf ./build
mkdir build

docker rmi quasar-webapp:latest

docker image build --no-cache -t quasar-webapp:latest .

docker save -o ./build/quasar-webapp.tar quasar-webapp:latest
# docker-compose up -d
docker builder prune -f

echo "* End"
sleep 30