FROM ubuntu:16.04

# Install dependencies
RUN apt-get update --yes && apt-get upgrade --yes && apt-get install -y git nodejs npm libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev libpng-dev build-essential g++ ffmpeg

RUN ln -s `which nodejs` /usr/bin/node

# Clone repo
COPY . /home/audiogram/audiogram
WORKDIR /home/audiogram/audiogram

# Install dependencies
RUN npm install

EXPOSE 8888

CMD ["npm", "start"]