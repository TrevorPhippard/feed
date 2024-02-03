const express = require('express');
const sequelize = require('./database/db');
const bodyParser = require('body-parser');

const bookingRoutes = require('./routes/bookingRoutes');
const deploymentRoutes = require('./routes/deploymentRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Sync the model with the database
sequelize.sync().then(() => {
  console.log('Database synchronized');
});

app.use(express.json());

/** ---------------------------------------------------------------------------
 *  @request_configurations
 * --------------------------------------------------------------------------- */

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
  console.log(req.originalUrl)
  res.status(404).send({
    url: req.originalUrl + ' not found'
  });
});

/** ---------------------------------------------------------------------------
 *  @ports
 * --------------------------------------------------------------------------- */

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

