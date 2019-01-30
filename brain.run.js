Brain.prototype.run = function () {

    // All controlling stuff will be handled here

    for (roomName in this.MyRooms) {
        // Main Loop to go through all rooms 

        this.MyRooms[roomName].run();


    }

}
