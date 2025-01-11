# Enemy Battle Game

This project is a turn-based battle game where a player fights against randomly selected enemies. The game features:
- Dynamic health tracking with progress bars.
- Randomized enemy attacks and player actions.
- Game over conditions and restart functionality.

## Table of Contents
- [Gameplay Overview](#gameplay-overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [Code Breakdown](#code-breakdown)

---

## Gameplay Overview
- **Objective**: Defeat the enemy by reducing its health to 0 before your health is depleted.
- **Turns**:
  - The player chooses an attack (Sword, Kick, or Punch) to inflict damage.
  - The enemy counterattacks with a randomly chosen attack.
- **Victory Conditions**:
  - Player wins if the enemy's health reaches 0.
  - Game over if the player's health reaches 0.

---

## Technologies Used
- **Frontend**:
  - HTML5, CSS3 (tailored styles for a clean interface)
  - WebCrumbs for automated frontend structure
- **JavaScript**:
  - Dynamic game logic
  - Real-time health updates
  - Event-driven gameplay mechanics

---

## Project Structure
```
project/
|-- static/
|   |-- styles/
|       |-- build.css  # Main stylesheet
|-- scripts/
|   |-- main.js        # Game logic
|-- index.html         # Game interface
```

---

## How to Run
1. Clone the repository to your local machine.
2. Ensure you have a modern browser (e.g., Chrome, Firefox) installed.
3. Open `index.html` in the browser.
4. Start playing by selecting your attack options.

---

## Code Breakdown

### Enemy Logic
- **Enemy Data**:
  ```javascript
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
  ];
  ```
  Each enemy has a name and three attack types with corresponding damage values.

- **Random Enemy Selection**:
  ```javascript
  function sortEnemie() {
      return enemiesObject[Math.floor(Math.random() * enemiesObject.length)];
  }
  ```
  
- **Enemy Attacks**:
  ```javascript
  function sortAttack() {
      const attackKeys = Object.keys(sortedEnemie.attacks);
      const randomKey = attackKeys[Math.floor(Math.random() * attackKeys.length)];
      return { attack: randomKey, damage: sortedEnemie.attacks[randomKey] };
  }
  ```

### Player Logic
- **Player Data**:
  ```javascript
  let playerInfo = [
      {
          name: 'Guardian',
          attacks: {
              sword: 35,
              kick: 20,
              punch: 5
          }
      }
  ];
  ```

- **Attack Handling**:
  ```javascript
  document.querySelectorAll('#option').forEach(button => {
      button.addEventListener('click', (event) => {
          const value = event.target.dataset.value;
          if (attackValues[value]) {
              enemieLife -= attackValues[value];
          }
      });
  });
  ```

### Health Tracking
- **Enemy Health Bar**:
  ```javascript
  function updateEnemieHealthBar() {
      const maxHealth = 120;
      const healthPercentage = (enemieLife / maxHealth) * 100;
      document.getElementById('enemieHealthBar').style.width = `${healthPercentage}%`;
  }
  ```

- **Game Over Conditions**:
  ```javascript
  function gameOver() {
      if (enemieLife <= 0) {
          document.getElementById('gameStatus').innerHTML = 'The enemy is dead';
      } else if (playerLife <= 0) {
          document.getElementById('gameStatus').innerHTML = 'You died';
      }
  }
  ```

### Game UI
- **Dynamic Updates**:
  - Enemy health is visually represented by a progress bar.
  - Messages display the current game status.

- **Restart Game**:
  ```javascript
  function reloadPage() {
      location.reload();
  }
  ```

---

## Future Improvements
- Add multiple player characters.
- Implement more complex attack patterns for enemies.
- Create additional victory conditions and difficulty levels.

---

Enjoy the game and have fun coding!

