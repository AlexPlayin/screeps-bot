var myRoomConstructor = require('myRoom');

function Brain() {
    // Brain initialisation

    this.memory = Memory.brain;

    this.memory.myRooms = [];

    this.myRooms = {};

    this.queue = [];

    // Getting all rooms in my possession and creating a myRoom object for them
    for (roomName in Game.rooms) {
        var room = Game.rooms[roomName];
        if (room.controller.owner == 'AlexPlayin') {
            this.memory.myRooms.push(roomName);
            this.myRooms[roomName] = new myRoomConstructor(roomName);

            // Run reload once to fill internal variables
            this.myRooms[roomName].reload();
        }
    }
}

module.exports = Brain;
