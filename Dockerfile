FROM node:20.12.2-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./ ./

RUN npm run build
ENV TZ=Asia/Seoul

CMD ["npm","run","start"]
EXPOSE 3000
