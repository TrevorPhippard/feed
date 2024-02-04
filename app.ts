import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import {users} from './seeders/users';
// import {projects} from './seeders/projects'
// import {projectassignments} from './seeders/projectassignments'


const createUsers = ()=> {
    users.map(user=>{
        db.User.create(user).then(function(user: { toJSON: () => any; }) {
            // you can now access the newly created user
            console.log('success', user.toJSON());
        })
        .catch(function(err: any) {
            // print the error details
            console.log(err);
        });
    })
}

createUsers();

// app.get('/', (req, res) => {
//     db.User.findAll({
//         include: {
//             model: db.Project
//         }
//     }).then((result: object) => res.json(result)).catch((err: object) => console.error(err));
// })


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})