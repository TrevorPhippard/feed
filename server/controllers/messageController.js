import Message from '../models/message.model';


// add message output: { user, channel, msg }
export const addMsgToRoom = (req, res) => {

    const { displayName, roomId, msg } = req


    //Build the user object to write to database
    const newMessage = {
        user_id: displayName,
        room_id: roomId,
        message_body: msg
    }


    Message.create(newMessage)
        .then(savedUser => {
            const myOptions = { status: 200, statusText: savedUser.id };
            new Response(myOptions)
        })
        .catch(err => {
            const myOptions = { status: 500, statusText: err.message };
            new Response(myOptions)
        });
}

// getting all messages
export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// Controller for getting a user by ID
export const getMessageById = async (req, res) => {

    try {
        const messageId = req.params.roomId.split(':')[1];

        const message = await Message.findAll({ room_id: messageId });
        if (!message) {
            res.status(404).send('message not found');
        } else {
            res.json(message);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// updating a user
export const updateMessageById = async (req, res) => {
    try {
        const msgId = req.params.id;
        const { id, user_id, room_id, message_body } = req.body;
        const msg = await Message.findByPk(msgId);
        if (!msg) {
            res.status(404).send('msg not found');
        } else {
            msg.id = id,
                msg.user_id = username,
                msg.room_id = role,
                msg.message_body = role,
                await msg.save();
            res.json({ message: 'msg updated successfully', msg });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// deleting a user by ID
export const removeMsgByRoom = async (req, res) => {
    try {
        const roomId = req.params.room;
        const message = await Message.findByPk(roomId);
        if (!message) {
            res.status(404).send('message not found');
        } else {
            await message.destroy();
            res.send('message deleted successfully');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};