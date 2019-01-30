// Required load order

/*
- Existing creeps (c1)
- Storage units (c2)
- Sources (c3)

*/

// Reloads all cached creeps and structures and sources
myRoom.prototype.reload = function () {
    // ************************** SETUP FUNCTIONS ******************************
    this.setTier();

    // ************************** ALL CREEPS IN MEMORY **************************
    this.memory.creeps = {};

    // All creeps of room in Memory
    for (role in maxWorkers) {

        this.memory.creeps[role] = [];

    }

    var myCreeps = this.room.find(FIND_MY_CREEPS);

    for (creepName in myCreeps) {

        this.memory.creeps[myCreeps[creepName].memory.role].push(myCreeps[creepName].id);

    }

    // ************************* STORAGE OBJ IN MEMORY *************************

    // Not needed if storages arent built yet
    if (this.tier > 1) {

        this.memory.energyStorage = this.room.storage.id;

        this.memory.resourceStorage = [];

        var potentialContainers = this.room.find(FIND_STRUCTURES, {
            filter: s => {
                if (s.structureType == STRUCTURE_CONTAINER) {
                    var lowest = 1000;
                    var sources = this.room.find(FIND_SOURCES);
                    for (sourceName in sources) {
                        var range = s.pos.getRangeTo(sources[sourceName]);
                        if (range < lowest) {
                            lowest = range;
                        }
                    }
                    if (lowest != 0) return s;
                }
            }
        });

        for (containerName in potentialContainers) {
            this.memory.resourceStorage.push(potentialContainers[containerName].id);
        }

    }

    // ************************** SOURCE OBJ IN MEMORY *************************
    var mySources = this.room.find(FIND_SOURCES);

    this.memory.sources = [];

    if (mySources.length > 0) {
        for (var i = 0; i < mySources.length; i++) {

            var thisSource = mySources[i];

            var objToSubmit = {
                type: RESOURCE_ENERGY,
                assignedHarvester: '',
                assignedRunner: '',
                sourceID: thisSource.id
            };

            // Only setup sources if tier > 1, otherwise fallbackCreeps will be used as normal state
            if (this.tier > 1) {
                objToSubmit.containerID = thisSource.pos.findClosestByRange(FIND_STRUCTURE, {
                    filter: s => {
                        if (s.structureType == STRUCTURE_CONTAINER) return s;
                    }
                }).id;

                var thisFlag = thisSource.pos.findClosestByRange(FIND_FLAGS, {
                    filter: s => {
                        if (s.color == COLOR_RED) return s;
                    }
                })
                objToSubmit.flagID = thisFlag.id;
                objToSubmit.flagPos = thisFlag.pos;

                // Find the assigned harvester for this source
                for (creepName in this.memory.creeps.harvester) {
                    var creep = Game.getObjectById(creepName);
                    var sourceID = creep.memory.sourceObj.sourceID;
                    if (sourceID == objToSubmit.sourceID) {
                        objToSubmit.assignedHarvester = creep.id;
                        break;
                    }
                }

                // Check if one has been found
                if (objToSubmit.assignedHarvester == '') {
                    // If not => Instruct spawner to create one
                    var entry = {
                        action: 'spawn',
                        role: 'harvester',
                        memory: {
                            sourceObj: {
                                sourceID: objToSubmit.sourceID,
                                containerID: objToSubmit.containerID,
                                flagPos: objToSubmit.flagPos
                                type: RESOURCE_ENERGY
                            }
                        }
                    };
                    this.spawner.addToQueue(entry);
                }

                // Find the assigned containerRunner for this source
                for (creepName in this.memory.creeps.containerRunner) {
                    var creep = Game.getObjectById(creepName);
                    var containerID = creep.memory.containerID;
                    if (containerID == objToSubmit.containerID) {
                        objToSubmit.assignedRunner = creep.id;
                        break;
                    }
                }

                // Check if one has been found
                if (objToSubmit.assignedRunner == '') {
                    // If not => Instruct spawner to create one
                    var entry = {
                        action: 'spawn',
                        role: 'containerRunner',
                        memory: {
                            containerID: objToSubmit.containerID,
                            storageID: this.memory.energyStorage,
                            type: RESOURCE_ENERGY
                        }
                    };
                    this.spawner.addToQueue(entry);
                }

            }
            this.memory.sources.push(objToSubmit);
        }
    }


    // ******************** UNIMPORTANT STUFF *******************
    // Energy available in Memory
    this.memory.energyAvailable = this.room.energyAvailable;

    // Nuke ID in Memory
    var myNuke = this.room.find(FIND_STRUCTURES, {
        filter: s => {
            if (s.structureType == STRUCTURE_NUKE) return s;
        }
    });

    if (myNuke.length > 0) {
        this.memory.nuke = myNuke[0].id;
    }

    // Terminal ID in Memory
    var myTerminal = this.room.find(FIND_STRUCTURES, {
        filter: s => {
            if (s.structureType == STRUCTURE_TERMINAL) return s;
        }
    });

    if (myTerminal.length > 0) {
        this.memory.terminal = myTerminal[0].id;
    }

    // Spawn IDs in Memory
    var mySpawns = this.room.find(FIND_STRUCTURES, {
        filter: s => {
            if (s.structureType == STRUCTURE_SPAWN) return s;
        }
    });

    this.memory.spawns = [];

    mySpawns.foreach(s => {
        this.memory.spawns.push(s.id);
    });

    // Resource Type in Memory
    var myResources = this.room.find(FIND_MINERALS);

    if (myResources.length > 0) {
        this.memory.resourceType = myResources[0].resourceType;
    } else {
        this.memory.resourceType = 0;
    }
    this.spawner.run();
}
