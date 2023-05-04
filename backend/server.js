const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const trainsNearby = require('./routes/trainsNearby')
const alerts = require('./routes/mbtaAlerts')
const stopRoutes = require('./routes/addStopForUser')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerFile = require('./swagger.json');

require('dotenv').config();
const SERVER_PORT = 9000

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/train',trainsNearby)
app.use('/mbta', alerts)
app.use('/user', stopRoutes)

const specs = swaggerJsdoc({
  definition: swaggerFile,
  apis: ['./routes/*.js'], 
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
