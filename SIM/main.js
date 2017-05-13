var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleBuilder2 = require('role.builder2');
var roleUpgrader = require('role.upgrader');
var roleUpgrader2 = require('role.upgrader2');
var roleUpgrader3 = require('role.upgrader3');
var roleUpgrader4 = require('role.upgrader4');
var roleAttacker = require('role.attacker');
var hvrMax = 2;
var upMax = 5;
var builMax = 0;

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    
    if(attackers.length < 0) {
        var newName = Game.spawns['KEY'].createCreep([ATTACK,TOUGH,TOUGH,MOVE], "a", {role: 'attacker'});
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(harvesters.length < hvrMax) {
        var index = getIndex(hvrMax, "hvr", harvesters);

        if (index == 1)
        {
            var newName = Game.spawns['KEY'].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], "hvr" + index, {role: 'harvester'});
        }
        else
        {
            var newName = Game.spawns['KEY'].createCreep([WORK,CARRY,MOVE], "hvr" + index, {role: 'harvester'});
        }
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(builders.length < builMax) {
        var index = getIndex(builMax, "buil", builders);
        var newName = Game.spawns['KEY'].createCreep([WORK,CARRY,MOVE], "buil" + index, {role: 'builder'});
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(upgraders.length < upMax) {
        var index = getIndex(upMax, "up", upgraders);
        
        if ((index >= 1) && (index <= 1))
        {
            var newName = Game.spawns['KEY'].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], "up" + index, {role: 'upgrader'});
        }
        else
        {
            var newName = Game.spawns['KEY'].createCreep([WORK,CARRY,MOVE], "up" + index, {role: 'upgrader'});
        }
    }

    if(Game.spawns['KEY'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['KEY'].spawning.name];
        Game.spawns['KEY'].room.visual.text(
            spawningCreep.memory.role,
            Game.spawns['KEY'].pos.x + 1,
            Game.spawns['KEY'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            if ((creep.name == "buil1") || (creep.name == "buil2"))
            {
                roleBuilder2.run(creep);
            }
            else
            {
                roleBuilder.run(creep);
            }
        }
        if(creep.memory.role == 'upgrader') {
            if (creep.name == "up1")
            {
                roleUpgrader2.run(creep);
            }
            else if (creep.name == "up0")
            {
                roleUpgrader.run(creep);
            }
            else
            {
                roleUpgrader4.run(creep);
            }
        }
    }
}

function getIndex(max, prefix, creeps)
{
    var used = new Array(max);
    var indexUsed;
    var indexExist;
    
    for (indexUsed = 0; indexUsed < used.length; indexUsed++)
    {
        used[indexUsed] = false;
        
        for (indexExist = 0; indexExist < creeps.length; indexExist++)
        {
            if (creeps[indexExist].name == prefix + indexUsed)
            {
                used[indexUsed] = true;
            }
        }
    }

    for (indexUsed = 0; used[indexUsed]; indexUsed++){}
    
    return indexUsed;
}