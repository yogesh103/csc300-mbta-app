FROM node:16

ENV NODE_ENV=dev
ARG DB_URL
ARG SERVER_PORT
ARG MBTA_API_KEY
ARG GOOGLE_MAPS_API_KEY
ARG ACCESS_TOKEN_SECRET
WORKDIR /app
COPY ./package.json .
# install dependencies
RUN npm install
# copy all files
COPY . .

EXPOSE 9000

# Start the app with nodemon
CMD ["npm", "run", "server"]