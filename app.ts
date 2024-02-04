import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import { users } from './seeders/users';

import bookingRoutes from './routes/bookingRoutes';
import deploymentRoutes from './routes/deploymentRoutes';
import partnerRoutes from './routes/partnerRoutes';
import userRoutes from './routes/userRoutes';



const createUsers = () => {
    users.map(user => {
        db.User.create(user).then(function (user: { toJSON: () => any; }) {
            // you can now access the newly created user
            console.log('success', user.toJSON());
            })
            .catch(function (err: any) {
                // print the error details
                console.log(err);
            });
    })
}

createUsers();

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

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})