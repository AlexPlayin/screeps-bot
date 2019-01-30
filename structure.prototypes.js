StructureContainer.prototype.isFull = function () {
    var sumOfAll = _.sum(this.store);

    if (sumOfAll == this.storeCapacity) {
        return true;
    } else {
        return false;
    }

}

StructureStorage.prototype.isFull = function () {
    var sumOfAll = _.sum(this.store);

    if (sumOfAll == this.storeCapacity) {
        return true;
    } else {
        return false;
    }

}
StructureSpawn.prototype.isFull = function () {

    if (this.energy == this.energyCapacity) {
        return true;
    } else {
        return false;
    }

}
StructureExtension.prototype.isFull = function () {

    if (this.energy == this.energyCapacity) {
        return true;
    } else {
        return false;
    }

}
StructureLab.prototype.isFull = function () {

    if (this.energy == this.energyCapacity) {
        return true;
    } else {
        return false;
    }

}
