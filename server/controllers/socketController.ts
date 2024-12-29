/* eslint-disable @typescript-eslint/no-explicit-any */
import Model from "../models/message.model";
import BaseController from "../controllers/baseController";

const Controller = new BaseController(Model);export default function (io: any, socket: any, onlineUsers: any) {

    function onConnectToServer(data: any) {
        // console.log("data::", data)
        onlineUsers.push(data);
    }

    function onMessage({ message }: any, callback: any): void {
        io.to(message.roomId).emit("receivedMsg", { message });
        Controller.addEntry(message);
        callback({ status: "ok" });
    }

    function onUser({ roomId, socketId }: any) {
        // console.log(`user ${userId} has joined room ${roomId}`);
        socket.join(roomId);
        // let room know someone joined
        for (let i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i].socketId === socketId) {
                onlineUsers[i].roomId = roomId;
                io.to(roomId).emit("enteredRoom", onlineUsers[i]);
                break;
            }
        }
    }

    function onLeave({ roomId, socketId }: any) {
        // console.log(`user ${userId} has left room ${roomId}`);
        socket.leave(roomId);
        // find user info
        for (let i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i].socketId === socketId) {
                onlineUsers[i].roomId = null;
                io.to(roomId).emit("disconnected", onlineUsers[i]);
                break;
            }
        }
    }

    function onDisconnect() {
        // console.log(`user ${socket.id} disconnected`);
        for (let i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i].socketId === socket.id) {
                // let clients know user disconnected
                io.to(onlineUsers[i].roomId).emit("disconnected", onlineUsers[i]);
                // delete user from online list
                onlineUsers.splice(i, 1);
            }
        }
    }

    function onEnteredRoom() {
        // console.log(`user ${socket.id} enteredRoom`);
        for (let i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i].socketId === socket.id) {
                // let clients know user enteredRoom
                io.to(onlineUsers[i].roomId).emit("enteredRoom", onlineUsers[i]);
                // delete user from online list
                onlineUsers.splice(i, 1);
            }
        }
    }

    return {
        onConnectToServer,
        onMessage,
        onUser,
        onLeave,
        onDisconnect,
        onEnteredRoom,
    }
}