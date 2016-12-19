FROM dongraham/node-dev:latest
MAINTAINER Donovan Graham <donovan@platform7.com>

COPY ./data /data
WORKDIR /data

EXPOSE 3000

CMD ["npm", "start"]
