FROM node:16

ENV NODE_ENV=dev

WORKDIR /app

# copy package files
COPY /backend/package-lock.json .
COPY /backend/package.json .

# copy all files
COPY /backend/. .
#Probably should add this to .dockerignore but i know some versions are icky with that
RUN rm -rf node_modules
# install dependencies
RUN npm install

EXPOSE 9000

CMD [ "node", "server" ]