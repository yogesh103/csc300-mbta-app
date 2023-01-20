## START UP 

This project is now dockerized along with the mongodb dependency. 
To startup the project 
Download Docker Desktop 
https://www.docker.com/products/docker-desktop/

This will handle all the orchestration of all the containerized services ( frontend, backend , mongodb, mongodb-express)
To startup all these services 

run `docker-compose up -d` from the root directory in your terminal and this should bring up all four containers. 

The frontend is exposed in PORT 3000 
The Backend is exposed in PORT 9000
Mongodb is exposed in PORT 27017
Mongo-express ( A UI To manage your local mongodb instance ) is exposed in PORT 8081
