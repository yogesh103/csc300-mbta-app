FROM node:16

ENV NODE_ENV=development

WORKDIR /app

# copy package files
COPY package*.json ./

# copy all files
COPY . .
RUN rm -rf node_modules
# install dependencies
RUN npm install

EXPOSE 9000

CMD [ "node", "server" ]