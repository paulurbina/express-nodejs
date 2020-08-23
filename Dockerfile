FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4040

CMD [ "npm", "run", "dev" ]


# FROM node:10

# WORKDIR /usr/src/app

# COPY package.json .

# RUN npm install

# #RUN npm install nodemon -g

# COPY . .

#EXPOSE 8080

#CMD nodemon -L --watch . index.js

#CMD [ "npm", "start" ]

#CMD ./node_modules/.bin/bats wait-for.bats