FROM node:16

ENV NODE_ENV=dev
ENV CHOKIDAR_USEPOLLING=true
WORKDIR /app
# copy package files
# copy package files
COPY ./package-lock.json .
COPY ./package.json .
# install dependencies
RUN npm install
# copy all files
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]