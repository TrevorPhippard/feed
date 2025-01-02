/* eslint-disable @typescript-eslint/no-explicit-any */
import Model from "../models/message.model";
import BaseController from "../controllers/baseController";

const Controller = new BaseController(Model);
const onlineUsers:any = {};

export default function (io: any, socket: any) {


    function onConnectToServer(data: any) {
        console.log("data::", data)
        // onlineUsers.push(data);
    }

    function onMessage({ message }: any, callback: any): void {
        io.to(message.room_id).emit("receivedMsg", { message });
        Controller.addEntry(message);
        callback({ status: "ok" });
    }

    interface OnUserType{
        room_id: string;
        userId: string;
    }
    function onEnteredRoom({room_id}:any) {
        io.to(room_id).emit("enteredRoom", onlineUsers[socket.id]);
    }
    
    function onUser(res: OnUserType) {

        const { room_id, userId } = res;
        const oldKey = Object.values(onlineUsers).indexOf(userId);
        if (oldKey > -1) { delete  onlineUsers[oldKey]}

        console.log(`user ${userId} has joined room ${room_id}`);

        socket.join(room_id);
        io.emit("join", userId);
        onlineUsers[socket.id] = userId;
        // let room know someone joined
        io.to(room_id).emit("enteredRoom", onlineUsers);

    }

    function onLeave({ room_id, userId }: any) {
        // console.log(`user ${userId} has left room ${room_id}`);
        socket.leave(room_id);
        io.emit("disconnected", userId);
        io.to(room_id).emit("disconnected", onlineUsers[socket.id]);

    }

    function onDisconnect() {
        console.log('disconnected',onlineUsers)
        io.emit("disconnected", onlineUsers[socket.id]);
        delete  onlineUsers[socket.id];

    }


    function onInvite({userId, room_id}:any){
        console.log('--->')
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