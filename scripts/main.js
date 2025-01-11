// sort a enemy in a list 
// sort attacks in a list
// /--> 1 medium, 1 stronger, 1 weak

// start a fight
// 1 round for player, 1 for enemy /--> sort for a weak, strong or medium attack
// if player losts game ask to restart, else the game asks to close or sort enemy again


// enemy
const gameDisplay = document.getElementById('gameDisplay'); // getting HTML element (game display)

const endGame = document.getElementById('endGame');
function reloadPage() {
    location.reload();
}

endGame.style.display = 'none'; // setting game over screen to not appear

var enemieLife = 120;

let enemiesObject = [ // object that contains principal information of enemies in the game, name, attacks, damage per attack... (life isn't listed in this object)
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
    return enemiesObject[Math.floor(Math.random() * enemiesObject.length)]; // responsible function for sorting the enemy that user will battle with 
}

const sortedEnemie = sortEnemie(); // variable responsible for keeping the sorted value saved in the round

function sortAttack() { // responsible function for sorting the attack that enemy will use against the user/player 
    const attackKeys = Object.keys(sortedEnemie.attacks); // reserve only attack names in an array 
    const randomKey = attackKeys[Math.floor(Math.random() * attackKeys.length)]; // sort a key (attack name)
    return { attack: randomKey, damage: sortedEnemie.attacks[randomKey] }; // return attack name with its damage
}

// player
var playerLife = 100;

let playerInfo = [ // reserves player information, in the same pattern as object "enemiesObject"
    {
        name: 'Guardian',
        attacks: {
            sword: 35,
            kick: 20,
            punch: 5
        }
    }
];

// gameflow
document.querySelectorAll('#option').forEach(button => { // responsible event to catch the selected value from the user
    button.addEventListener('click', (event) => {
        const value = event.target.dataset.value;
        console.log(`Attack = ${value}`);

        const attackValues = {
            sword: playerInfo[0].attacks.sword,
            kick: playerInfo[0].attacks.kick,
            punch: playerInfo[0].attacks.punch
        };

        if (attackValues[value]) { // if attack is a valid value, decrement the damage from enemy life
            enemieLife -= attackValues[value];
            console.log(`New Enemy Life: ${enemieLife}`);
        } else {
            console.log("Invalid attack.");
        }

        if (enemieLife < 0) { // make it impossible for enemy health/life to be less than zero
            enemieLife = 0;
        }

        document.getElementById('enemieHealth').innerHTML = `Health: ${enemieLife}`; // live display enemy life 

        function gameOver() {
            if (enemieLife <= 0) {
                setTimeout(() => {
                    document.getElementById('gameStatus').innerHTML = 'The enemy is dead';
                    gameDisplay.style.display = 'none';
                    endGame.style.display = 'flex';
                    document.getElementById('finishStatus').innerHTML = 'You won';
                }, 2000)
            } else if (playerLife <= 0) {
                setTimeout(() => {
                    document.getElementById('gameStatus').innerHTML = 'You died';
                    endGame.style.display = 'flex';
                    gameDisplay.style.display = 'none';
                }, 2000);
            }

            if (enemieLife <= 0 && playerLife <= 0) {
                setTimeout(() => {
                    document.getElementById('gameStatus').innerHTML = 'Draw';
                }, 2000);
            }
        }
        gameOver();

        function updateEnemieHealthBar() {
            const enemieHealthBar = document.getElementById('enemieHealthBar');
            
            const maxHealth = 120; // enemie max health
            const healthPercentage = (enemieLife / maxHealth) * 100; // calculate the percentage
            
            enemieHealthBar.style.width = `${healthPercentage}%`; // update the bar width
            
            if (enemieLife <= 0) {
                enemieHealthBar.style.width = `0%`; 
            }
        }

        updateEnemieHealthBar();

        function enemieTurn() {
            const sortedAttack = sortAttack(); // sort a new enemy attack
            console.log(`Enemy Attack: ${sortedAttack.attack}, Damage: ${sortedAttack.damage}`);
            document.getElementById('turn').innerHTML = `Enemy attack: [ ${sortedAttack.attack}, Damage: ${sortedAttack.damage} ]`;

            playerLife -= sortedAttack.damage;

            if (playerLife < 0) { 
                playerLife = 0; // make it impossible for player health/life to be less than zero
            }

            document.getElementById('playerHealth').innerHTML = `Health: ${playerLife}`;
            gameOver(); // verify if game ends
        }

        const attacksAction = document.querySelectorAll('#option');

        // Disable buttons immediately to prevent multiple clicks
        attacksAction.forEach(btn => btn.disabled = true);
        attacksAction.forEach(btn => btn.style.background = '#ccc')
        
        // Enemy turn occurs after 1 second
        setTimeout(() => {
            enemieTurn();
            
            // Re-enable buttons 2 seconds after the player's turn starts
            setTimeout(() => {
                attacksAction.forEach(btn => btn.disabled = false);
                attacksAction.forEach(btn => btn.style.background = '#f59e0b')
            }, 1000);
        }, 1000);

        if (playerLife <= 0) {
            document.getElementById('playerHealth').innerHTML = 'Health: 0'; // make it impossible for player health/life to be less than zero
        }
    });
});

document.getElementById('enemieName').innerHTML = `${sortedEnemie.name}`;
