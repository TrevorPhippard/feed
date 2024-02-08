import db from '../models'

import { bookings } from '../seeders/bookings';
import { deployments } from '../seeders/deployments';
import { partners } from '../seeders/partners';
import { users } from '../seeders/users';

export const createBookings = () => {
    bookings.map(user => {
        db.User.create(user);
    })
}
export const createDeployments = () => {
    deployments.map(user => {
        db.User.create(user);
    })
}
export const createPartners = () => {
    partners.map(user => {
        db.User.create(user);
    })
}
export const createUsers = () => {
    users.map(user => {
        db.User.create(user);
    })
}

interface Booking {
    id: number;
    username: string;
    role: string;
}

interface Deployment {
    id: number;
    parter_deployed_to: string;
    body: string;
    user_id: string;
    status: string;
}

interface Partner {
    id: number;
    name: string;
    current_booking: string;
}

interface User {
    id: number;
    username: string;
    role: string;
}

export const getUsers = async (): Promise<User[]> => {
    const userdata = await db.User.findAll({
        include: {
            model: db.Booking,
            through: {
                attributes: []
            }
        }
    });

    const users = await userdata.map((user: User) => {
        return {
            id: user.id,
            username: user.username,
            role: user.role,
        }
    })
    return users
}