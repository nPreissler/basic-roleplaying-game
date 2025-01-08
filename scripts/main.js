// sort a enemy in a list 
// sort attacks in a list
// /--> 1 medium, 1 stronger, 1 weak

// start a fight
// 1 round for player, 1 for enemy /--> sort for a weak, strong or medium attack
// if player losts game ask to restart, else the game asks to close or sort enemy again

let enemiesObject = [
    {
        name: "Dragon",
        attacks: {
            dragon_rage: 40,
            bite: 15,
            roar: 5
        }
    },
    {
        name: "Troll",
        attacks: {
            smash: 35,
            kick: 25,
            punch: 5
        }
    },
    {
        name: "Zombie",
        attacks: {
            bite: 30,
            poison: 20,
            punch: 5
        }
    }
]

function sortEnemie() {
    return enemiesObject[Math.floor(Math.random() * enemiesObject.length)];
}

const sortedEnemie = sortEnemie();

function sortAttack() {
    const attackKeys = Object.keys(sortedEnemie.attacks); 
    const randomKey = attackKeys[Math.floor(Math.random() * attackKeys.length)];
    return { [randomKey]: sortedEnemie.attacks[attackKeys] };
}

const sortedAttack = sortAttack()
