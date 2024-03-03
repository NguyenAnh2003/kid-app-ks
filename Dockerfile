FROM node:alpine

WORKDIR /p-app

COPY . .

RUN npm install


CMD ["yarn", "android"]