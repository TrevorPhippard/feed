import Room from '../models/room.model';


// add room output: { room, channel, room }
export const addRoom = (id, userId, roomId, msgs) => {

    //Build the room object to write to database
    const newRoom = { 
        id: id,
        user_id: userId, 
        room_id: roomId, 
        msgs:  msgs
    }

    Room.create(newRoom)
        .then(savedRoom => {
            res.status(200).json({ status: "Success", new_room_id: savedRoom.id });
        })
        .catch(err => res.status(500).send(err.room));
}

// getting all rooms
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// Controller for getting a room by ID
export const getRoomById = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findByPk(roomId);
        if (!room) {
            res.status(404).send('room not found');
        } else {
            res.json(room);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// updating a room
export const updateRoomById = async (req, res) => {
    try {
        const roomId = req.params.id;
        const { id,user_id, room_id, room_body } = req.body;
        const room = await Room.findByPk(roomId);
        if (!room) {
            res.status(404).send('room not found');
        } else {
                room.id = id,
                room.user_id = user_id, 
                room.room_id = room_id, 
                room.msgs =  room_body
                await room.save();
            res.json({ room: 'room updated successfully', room });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// deleting a room by ID
export const removeroomByRoom = async (req, res) => {
    try {
        const roomId = req.params.room;
        const room = await Room.findByPk(roomId);
        if (!room) {
            res.status(404).send('room not found');
        } else {
            await Room.destroy();
            res.send('room deleted successfully');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};