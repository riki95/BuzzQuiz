FROM node:10.16.0

WORKDIR /code
COPY ./package.json /code/package.json
COPY ./package-lock.json /code/package-lock.json

RUN npm install -g npm
RUN npm install

VOLUME /code/node_modules