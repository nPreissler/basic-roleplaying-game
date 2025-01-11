// sort a enemy in a list 
// sort attacks in a list
// /--> 1 medium, 1 stronger, 1 weak

// start a fight
// 1 round for player, 1 for enemy /--> sort for a weak, strong or medium attack
// if player losts game ask to restart, else the game asks to close or sort enemy again


// enemie

var enemieLife = 120;

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

const sortedAttack = sortAttack(); // variable responsible for keep the sorted value saved in the round

// enemie

// player

var playerLife = 100;

let playerInfo = [ // reserves player informations, on same pattern of object "enemiesObject"
    {
        name: 'Guardian',
        attacks: {
            sword: 35,
            kick: 20,
            punch: 5
        }
    }
];

// player

//gameflow

document.querySelectorAll('#option').forEach(button => { //responsible event for catch the selected value for user
    button.addEventListener('click', (event) => {
        const value = event.target.dataset.value;
        console.log(`Attack = ${value}`);

        const attackValues = {
            sword: playerInfo[0].attacks.sword,
            kick: playerInfo[0].attacks.kick,
            punch: playerInfo[0].attacks.punch
        };

        if (attackValues[value]) { // if attack is valid value, descrement the damage from enemie life
            enemieLife -= attackValues[value];
            console.log(`New Enemy Life: ${enemieLife}`);
        } else {
            console.log("Ataque inválido.");
        }

        if (enemieLife < 0 && enemieLife < attackValues[value]) { // only console message
            console.log('enemie is dead');
        }

        var enemieHealth = document.getElementById('enemieHealth'); // cath an HTML element  

        if (enemieLife < 0) {
            enemieLife = 0; // turn impossible enemie health/life be less then zero
        }

        enemieHealth.innerHTML = `Health: ${enemieLife}`; // contnuating from line: 98 : --> and live display enemie life 

        function gameOver() {

            if (enemieLife <= 0) {
                document.getElementById('gameStatus').innerHTML = 'The enemie is died';
            } else if (playerLife <= 0) {
                document.getElementById('gameStatus').innerHTML = 'You died';
            }

            if (enemieLife <= 0 && playerLife <= 0) {
                document.getElementById('gameStatus').innerHTML = 'Draw';
            }

        }
        gameOver();

        function enemieTurn() {
            const sortedAttack = sortAttack(); // sort a new enemie attack
            console.log(`Enemy Attack: ${sortedAttack.attack}, Damage: ${sortedAttack.damage}`);
            document.getElementById('turn').innerHTML = `Enemy attack: [ ${sortedAttack.attack}, Damage: ${sortedAttack.damage} ]`

            playerLife -= sortedAttack.damage;

            if (playerLife < 0) {
                playerLife = 0; // turn impossible player health/life be less then zero
            }

            document.getElementById('playerHealth').innerHTML = `Health: ${playerLife}`;
            gameOver(); // verify if game ends
        }
        setTimeout(() => {
            enemieTurn();
        }, 1000)

        if (playerLife <= 0) {
            document.getElementById('playerHealth').innerHTML = 'Health: 0'; // turn impossible player health/life be less then zero
        }
    });
});

document.getElementById('enemieName').innerHTML = `${sortedEnemie.name}`;
//gameflow