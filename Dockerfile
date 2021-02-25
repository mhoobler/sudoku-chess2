FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install
RUN yarn global add nodemon

COPY . /usr/src/app

EXPOSE 3001

CMD ["nodemon", "index.ts"]
