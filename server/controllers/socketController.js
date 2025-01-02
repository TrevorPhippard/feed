import Model from "../models/message.model";
import BaseController from "./baseController";

const Controller = new BaseController(Model);
const onlineUsers = {};

export default function (io, socket) {

    function onConnectToServer(data) {
        // console.log("data::", data)
        // onlineUsers.push(data);
    }

    function onMessage({ message }, callback) {
        console.log(message, message.room_id)
        io.to(message.room_id).emit("receivedMsg", message);
        Controller.addEntry(message);
        callback({ status: "ok" });
    }


    function onEnteredRoom({room_id}) {
        io.to(room_id).emit("enteredRoom", onlineUsers[socket.id]);
    }

    function onUser(res) {

        const { room_id, userId } = res;
        const oldKey = Object.values(onlineUsers).indexOf(userId);
        if (oldKey > -1) { delete  onlineUsers[oldKey]}

        socket.join(room_id);
        io.emit("join", userId);
        onlineUsers[socket.id] = userId;
        // let room know someone joined
        io.to(room_id).emit("enteredRoom", onlineUsers);

    }

    function onLeave({ room_id, userId }) {
        // console.log(`user ${userId} has left room ${room_id}`);
        socket.leave(room_id);
        io.emit("disconnected", userId);
        io.to(room_id).emit("disconnected", onlineUsers[socket.id]);

    }

    function onDisconnect() {
        io.emit("disconnected", onlineUsers[socket.id]);
        delete  onlineUsers[socket.id];

    }

    function onInvite({userId, room_id}){
        socket.broadcast.emit('broadcast',{ userId, room_id})
    }

    return {
        onConnectToServer,
        onMessage,
        onUser,
        onLeave,
        onDisconnect,
        onEnteredRoom,
        onInvite
    }
}