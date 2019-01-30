function spawner(roomName, room) {
    // Initial setup
    this.roomName = roomName;
    this.room = room;
    this.memory = this.room.memory.spawner;
    this.queue = [];

    // Find all spawns in this room
    this.spawns = this.room.find(FIND_MY_STRUCTURES, {
        filter: s => {
            if (s.structureType == STRUCTURE_SPAWN) return s;
        }
    });
}

module.exports = spawner;
