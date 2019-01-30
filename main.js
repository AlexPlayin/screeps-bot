var Brain = new require('brain');
var brain = new Brain();

// ******************************************
// All the requires of prototypes belong here

// General prototypes 
require('structure.prototypes');

// ************ Specific objects ************
// *** myRoom ***
require('myRoom.reload');
require('myRoom.run');
require('myRoom.setTier');

// *** Brain ***
require('brain.run');

// *** Spawner ***
require('spawner.run');




// ******************************************



module.exports.loop = function () {

    // Actual main function
    // Only runs controller
    brain.run();


}
