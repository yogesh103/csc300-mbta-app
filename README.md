# mern-user-skeleton
This MERN stack implementation creates a small web application that lets users register, login, view a home page, and logout. 

Configuration
-------------
Under users/server/create .env file that looks similar to this:
DB_URL = mongodb+srv://admin:<your admin password>@cluster<some  number>.<some unique id>.mongodb.net/<some database name>
ACCESS_TOKEN_SECRET = xb3tim8rnIdoMMJfGNaqMxHX6zyWGBrR

The DB_URL comes from signing up for an MongoDB Atlas account and creating a cluster.  Under database select the cluster (likely
cluster0 if it is your first one) and select Connect. Select connect your application, driver=Node.js.  You will see
the database connection string in this window.

Generate a unique JWT access token for ACCESS_TOKEN_SECRET

Start Up
---------
Start the back end by going to users/server and executing npm start.
Start the front end by going to ui and executing npm start.
