const maxWorkers = require('maxWorkers');
const Spawner = require('spawner');

function myRoom(roomName) = {
    this.room = Game.rooms[roomName];
    this.roomName = roomName;
    this.memory = Memory[roomName];
    this.spawner = new Spawner(roomName, this);
    this.queue = [];
    this.tier = 0;
    this.maxWorkers = maxWorkers;
    this.reload();
}

module.exports = myRoom;
