// Function that figures out Tier and sets internal variable
myRoom.prototype.setTier = function () {
    var myTier = 0;

    // All strucutres in room --> more efficient to get all now and then just filter
    var myStructures = this.room.find(FIND_STRUCTURES);

    // From lowest to highest tier --> Most efficient
    /* 
    
    Tier 0: Exists
    Tier 1: Owns extensions
    Tier 2: Containers & Storages 
    Tier 3: 1000 Energy Available in Room
    Tier 4: Labs & 1500 Energy Available in Room & Terminal -> Capable to quicksend
    Tier 5: >3000 Energy Available in Room
    Tier 6: Nukes & Observer
    */

    var extensions = myStructures.filter(s => {
        if (s.structureType == STRUCTURE_EXTENSION) return s;
    });

    // Tier 1 Qualifier
    if (extensions.length == 0) {
        this.tier = myTier;
        return;
    }

    // Atleast tier 1
    myTier++;

    var storage = myStructures.filter(s => {
        if (s.structureType == STRUCTURE_STORAGE) return s;
    });
    var container = myStructures.filter(s => {
        if (s.structureType == STRUCTURE_CONTAINER) return s;
    });

    // Tier 2 Qualifier
    if (storage.length != 1 && container.length != 5) {
        this.tier = myTier;
        return;
    }

    // Atleast tier 2
    myTier++;

    // Tier 3 Qualifier 
    if (this.room.energyCapacityAvailable < 1000) {
        this.tier = myTier;
        return;
    }

    // At least tier 3
    myTier++;

    var labs = myStructures.filter(s => {
        if (s.structureType == STRUCTURE_LAB) return s;
    });
    var terminal = myStructures.filter(s => {
        if (s.structureType == STRUCUTRE_TERMINAL) return s;
    });

    // Tier 4 Qualifier
    if (labs.length == 0 && terminal.length == 0 && this.room.energyCapacityAvailable < 1500) {
        this.tier = myTier;
        return;
    }

    // At least tier 4
    myTier++;

    // Tier 5 Qualifier
    if (this.room.energyCapacityAvailable < 3000) {
        this.tier = myTier;
        return;
    }

    // At least tier 5
    myTier++;

    var nukes = myStructures.filter(s => {
        if (s.structureType == STRUCTURE_NUKE) return s;
    });
    var observer = myStructures.filter(s => {
        if (s.structureType == STRUCTURE_OBSERVER) return s;
    });

    // Tier 6 Qualifier
    if (nukes.length == 0 && observer.length == 0) {
        this.tier = myTier;
        return;
    }

    // Tier 6
    myTier++;
    this.tier = myTier;
    return;

}
