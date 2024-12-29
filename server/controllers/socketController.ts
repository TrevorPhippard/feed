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
        io.to(message.roomId).emit("receivedMsg", { message });
        Controller.addEntry(message);
        callback({ status: "ok" });
    }

    interface OnUserType{
        roomId: string;
        userId: string;
    }
    function onEnteredRoom({roomId}:any) {
        io.to(roomId).emit("enteredRoom", onlineUsers[socket.id]);
    }
    
    function onUser(res: OnUserType) {

        const { roomId, userId } = res;
        const oldKey = Object.values(onlineUsers).indexOf(userId);
        if (oldKey > -1) { delete  onlineUsers[oldKey]}

        console.log(`user ${userId} has joined room ${roomId}`);

        socket.join(roomId);
        io.emit("join", userId);
        onlineUsers[socket.id] = userId;
        // let room know someone joined
        io.to(roomId).emit("enteredRoom", onlineUsers);

    }

    function onLeave({ roomId, userId }: any) {
        // console.log(`user ${userId} has left room ${roomId}`);
        socket.leave(roomId);
        io.emit("disconnected", userId);
        io.to(roomId).emit("disconnected", onlineUsers[socket.id]);

    }

    function onDisconnect() {
        console.log('disconnected',onlineUsers)
        io.emit("disconnected", onlineUsers[socket.id]);
        delete  onlineUsers[socket.id];

    }


    function onInvite({userId, roomId}:any){
        console.log('--->')
        socket.broadcast.emit('broadcast',{ userId, roomId})
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