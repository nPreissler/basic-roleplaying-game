// sort a enemy in a list 
// sort attacks in a list
// /--> 1 medium, 1 stronger, 1 weak

// start a fight
// 1 round for player, 1 for enemy /--> sort for a weak, strong or medium attack
// if player losts game ask to restart, else the game asks to close or sort enemy again


// enemie

var enemieLife = 150;

let enemiesObject = [ //object that contains principal information of enemies in the game, name, attacks, damage per attack... (life isn't listed in this object)
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
];

function sortEnemie() {
    return enemiesObject[Math.floor(Math.random() * enemiesObject.length)]; // responsible function for sort the enemie that user will battle with 
}

const sortedEnemie = sortEnemie(); // variable responsible for keep the sorted value saved in the round

function sortAttack() { // responsible function for sort attack that enemie will use against the user/player 
    const attackKeys = Object.keys(sortedEnemie.attacks); // reserve only attacks names in a array 
    const randomKey = attackKeys[Math.floor(Math.random() * attackKeys.length)]; // sort a key (attack name)
    return { attack: randomKey, damage: sortedEnemie.attacks[randomKey] }; // return attack name with your damage again 
}

const sortedAttack = sortAttack() // variable responsible for keep the sorted value saved in the round

// enemie

// player

var playerLife = 100;

let playerInfo = [
    {
        name: 'Guardian',
        attacks: {
            sword: 35,
            kick: 20,
            punch: 5
        }
    }
]

// player

//gameflow

document.querySelectorAll('#option').forEach(button => { //evento que captura o valor selecionado pelo usuário
    button.addEventListener('click', (event) => {
        const value = event.target.dataset.value;
        console.log(`Attack = ${value}`)

        const attackValues = {
            sword: playerInfo[0].attacks.sword,
            kick: playerInfo[0].attacks.kick,
            punch: playerInfo[0].attacks.punch
        };

        if (attackValues[value]) {
            enemieLife -= attackValues[value];
            console.log(`New Enemy Life: ${enemieLife}`);
        } else {
            console.log("Ataque inválido.");
        }

        if(enemieLife < 0 && enemieLife < attackValues[value]){
            console.log('enemie is dead');
        }
        
    });
});

var playerHealth = document.getElementById('playerHealth');

playerHealth.innerHTML = `Health: ${playerLife}`;

var enemieHealth = document.getElementById('enemieHealth');

enemieHealth.innerHTML = `Health: ${enemieLife}`;

while (playerLife <= 0 || enemieLife <= 0) {
    sortAttack();
    console.log(sortAttack())
};

//gameflow