/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.updater');
 * mod.thing == 'a thing'; // true
 */

var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.attacking = true;
        
        if (creep.hits != creep.hitsMax)
        {
            creep.say("heal");
            creep.memory.attacking = false;
            creep.heal(creep);
            creep.moveTo(Game.spawns['KEY']);
        }
        if(creep.memory.attacking) {
	        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
            if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        /**
        if (creep.hits == creep.hitsMax)
        {
            creep.say("attack 1");
            creep.memory.attacking = true;
            var targets = creep.room.find(FIND_HOSTILE_CREEPS);
            creep.moveTo(targets[0]);
            creep.attack(targets[0]);
        }
        else if (creep.hits > creep.hitsMax / 2)
        {
            if (creep.memory.attacking)
            {
                creep.say("attack 2");
                creep.memory.attacking = true;
                var targets = creep.room.find(FIND_HOSTILE_CREEPS);
                creep.moveTo(targets[0]);
                creep.attack(targets[0]);
            }
            else
            {
                creep.memory.attacking = false;
                creep.say("heal 1");
                creep.moveTo(Game.spawns['KEY']);
                creep.heal(creep);
            }
        }
        else
        {
            creep.say("heal 2");
            creep.moveTo(Game.spawns['KEY']);
            creep.heal(creep);
            creep.memory.attacking = false;
        }
        */
    }
};

module.exports = roleAttacker;
