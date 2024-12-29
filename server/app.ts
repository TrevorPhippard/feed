// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * @todo Look up correct response codes for authorization
 *  also, maybe double check all of them
 *  only return users quizes
 */

import express from "express";
// import * as path from "path";

import cors from "cors";
import fileUpload from "express-fileupload";
import { createServer } from 'http'
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import compression from "compression";

import sequelize from "./models/sequelize";
import socketRoutes from "./routes/api/v1/socket";

import { Server } from 'socket.io'
import { instrument } from "@socket.io/admin-ui";
import routes from "./routes";




dotEnv.config();

const app = express();
const port = 3000;
const socketPort = 3001;

app.use(cors());
app.use(compression());

app.use("/images", express.static("images"));
app.use("/uploads", express.static("uploads"));

// jwt secret
const JWT_SECRET = process.env.JWT_SECRET;

/** ---------------------------------------------------------------------------
 *  @bodyparser
 * --------------------------------------------------------------------------- */

app.use(bodyParser.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public", {
  maxAge: "1d"
})); // Cache static files for 1 day

app.use(fileUpload({
  limits: { fileSize: 250 * 1024 * 1024 },
}));


// createUsers();
/** ---------------------------------------------------------------------------
 *  @Routes
 * --------------------------------------------------------------------------- */


app.use("/", routes);


// catch all the errors
// app.use((err:Error, req: Request, res: Response) => {
//   console.log("Error Handler");
// console.error(err.stack);
//   res.status(500).json({
//     error: true,
//     message: err.message,
//     code: "server_issue",
//   });
// });

app.use(function (req, res) {
  console.log(req.originalUrl);
  res.status(404).send({
    url: req.originalUrl + " not found",
  });
});
/** ---------------------------------------------------------------------------
 *  @Sockets
 * --------------------------------------------------------------------------- */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const socketServer = createServer(app);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = new Server(socketServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["socket-header"],
    credentials: true
  }
});

instrument(io, {
  auth: false,
  mode: "development",
});

io.use(async (socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  try {
    const user = await jwt.verify(token, JWT_SECRET);
    socket.user = user;
    next();
  } catch (error) {
    return next(new Error(error.message));
  }
});

io.on("connection", (socket: any) => socketRoutes(io, socket));

socketServer.listen(socketPort, () => {
  console.log(`SOCKET listening on *:${socketPort}`);
});


sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
})

