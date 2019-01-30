spawner.prototype.run = function () {

    var maxWorkers = this.maxWorkers;

    if (this.room.tier > 1) {

        for (roleName in maxWorkers) {

            var currAmount = this.room.memory.creeps[role].length;
            var shouldAmount = maxWorkers[role];

            if (currAmount < shouldAmount) {
                var diff = shouldAmount - currAmount;
            }

        }
    }

}
