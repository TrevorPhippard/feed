import MsgModel from "../models/message.model";
import RoomModel from "../models/room.model";

import BaseController from "./baseController";
import { Op } from "sequelize";

const MsgController = new BaseController(MsgModel);
const RoomController = new BaseController(RoomModel);

async function isAlready(username,room_id){
    const already = await RoomController.getEntryByQuery({
        where: {
            [Op.and]: [{ username: username }, { room_id: room_id}],
          }})
    return already;
}


export default function (io, socket) {



    function getRoomEntries(room_id){
        return RoomController.getEntryByQuery({
            where: {
                room_id: {[Op.eq]: room_id},
            },
        })
    }


    
    function rmRoomEntry(userId, room_id){
        return RoomController.removeEntryByQuery({
            where: {
                userId:{[Op.eq]: userId},
                room_id: {[Op.eq]: room_id},
            },
        })
    }


    function onConnectToServer(data) {
        (data);
    }

    function handleErrors(err)  {
        (err);
    }

    function onUserMessage({ room_id,username,message_body }, callback) {
        io.to(room_id).emit("receivedMsg", {room_id,username,message_body});
        MsgController.addEntry({room_id,username,message_body});
        callback({ status: "ok" });
    }

    function onEnteredRoom({room_id}) {
        io.to(room_id).emit("enteredRoom", getRoomEntries(room_id));
    }

    async function onUserJoin({ room_id,userId } ) {
        socket.join(room_id);
        io.emit("join", userId);
        var online = true;
        var username = userId;
        var IsEntry = await isAlready(username,room_id);
        if(!IsEntry.length){
            RoomController.addEntry({username, room_id, online});
        }
        io.to(room_id).emit("enteredRoom", getRoomEntries(room_id));
    }

    function onLeave({ room_id, userId }) {
        socket.leave(room_id);
        io.emit("disconnected", userId);
        rmRoomEntry({userId, room_id});
        io.to(room_id).emit("disconnected", getRoomEntries(room_id));
    }

    function onDisconnect(res) {
        // rmRoomEntry({userId, room_id});
        io.emit("disconnected", res);
    }

    function onInvite({userId, room_id}){
        socket.broadcast.emit('broadcast',{ userId, room_id})
    }

    return {
        onConnectToServer,
        onUserMessage,
        onUserJoin,
        onLeave,
        onDisconnect,
        onEnteredRoom,
        onInvite,
        handleErrors,
        isAlready
    }
}