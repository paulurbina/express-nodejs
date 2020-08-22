FROM node:10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#RUN npm install nodemon -g

COPY . .

#EXPOSE 8080

#CMD nodemon -L --watch . index.js

CMD [ "npm", "start" ]

#CMD ./node_modules/.bin/bats wait-for.bats