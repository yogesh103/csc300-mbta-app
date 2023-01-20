FROM node:16

ENV NODE_ENV=dev

WORKDIR /app

# copy package files
COPY /frontend/package-lock.json .
COPY /frontend/package.json .

# copy all files
COPY /frontend/. .
#Probably should add this to .dockerignore but i know some versions are icky with that
RUN rm -rf node_modules
# install dependencies
RUN npm ci

EXPOSE 3000

CMD [ "npm", "start" ]