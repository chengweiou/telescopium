yarn build:uat
rm -rf ~/Desktop/docker/universe/telescopium/dist
cp -r dist ~/Desktop/docker/universe/telescopium/
cp nginx.conf ~/Desktop/docker/universe/telescopium/default.conf
cp docker-compose.yml ~/Desktop/docker/universe/telescopium/docker-compose.yml
cd ~/Desktop/docker/universe/telescopium

docker compose down
docker compose rm -f
docker compose up -d
