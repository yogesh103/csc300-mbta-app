FROM node:16

ENV NODE_ENV=dev
WORKDIR /app
# copy package files
# copy package files
COPY ./package-lock.json .
COPY ./package.json .
# install dependencies
RUN npm install
# copy all files
COPY . .

EXPOSE 9000

CMD [ "node", "server" ]