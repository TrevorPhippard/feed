import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './models/sequelize';

import userRoutes from './routes/userRoutes';
import fileRoutes from './routes/fileRoutes';
import msgRoutes from './routes/msgRoutes';
import roomRoutes from './routes/roomRoutes';

import socketRoutes from './routes/socketIO'

const jwt = require('jsonwebtoken');
const dotEnv = require("dotenv")


dotEnv.config()
;

const app = express();
const port = 3000;

app.use(cors())
app.use('/images', express.static('photos'));

// jwt secret
const JWT_SECRET = process.env.JWT_SECRET ;
let userList: any[] = [];

/** ---------------------------------------------------------------------------
 *  @bodyparser
 * --------------------------------------------------------------------------- */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(bodyParser.json({limit:'50mb',}));
app.use(bodyParser.urlencoded({
  limit:'50mb',
  extended:true,
  parameterLimit: 1000000,
}));


// createUsers();
/** ---------------------------------------------------------------------------
 *  @Routes
 * --------------------------------------------------------------------------- */

// app.use(function (req, res) {
//   console.log(req.originalUrl)
//   res.status(404).send({
//     url: req.originalUrl + ' not found'
//   });
// });


app.use('/api',userRoutes);
app.use('/api',fileRoutes);
app.use('/api',msgRoutes);
app.use('/api',roomRoutes);



/** ---------------------------------------------------------------------------
 *  @Sockets
 * --------------------------------------------------------------------------- */

const socketServer = require('http').createServer(app, userList);

const io = require("socket.io")(socketServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["socket-header"],
    credentials: true
  }
});
  
  io.use(async (socket:any, next:any) => {
    const token = socket.handshake.auth.token;

    try {
      const user = await jwt.verify(token, JWT_SECRET);
      socket.user = user;
      next();
    } catch (error) {
      // @ts-ignore
      return next(new Error(error.message));
    }
  });
  
  io.on('connection', (socket: any) => socketRoutes(io, socket, userList));

  socketServer.listen(3001, () => {
    console.log('SOCKET listening on *:3001');
  });
  


sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})

