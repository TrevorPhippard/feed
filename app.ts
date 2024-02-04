import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import sequelize from './models/sequelize';
import { users } from './seeders/users';

import bookingRoutes from './routes/bookingRoutes';
import deploymentRoutes from './routes/deploymentRoutes';
import partnerRoutes from './routes/partnerRoutes';
import userRoutes from './routes/userRoutes';

import bodyParser from 'body-parser';
import cors from 'cors';

app.use(cors())
app.use('/images', express.static('photos'));


// app.use(cors(corsOptions));
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

/** ---------------------------------------------------------------------------
 *  @Routes
 * --------------------------------------------------------------------------- */

app.use('/api',bookingRoutes);
app.use('/api',deploymentRoutes);
app.use('/api',partnerRoutes);
app.use('/api',userRoutes);

app.use(function (req, res) {
//   console.log(req.originalUrl)
  res.status(404).send({
    url: req.originalUrl + ' not found'
  });
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})