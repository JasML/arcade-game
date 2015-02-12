// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if (this.x > 101 * 6) {
        this.x = -101;
        this.speed = Math.random() * (enemySpeedMax - enemySpeedMin) + enemySpeedMin;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    // TODO: make character image selectable
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {

}

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    // Update either x or y position of player per keypad input, with limits so
    // that player does not disappear from the canvas
    if (key == 'up') {
        if (this.y > 0) {
            this.y = this.y - 83;
        }
    } else if (key == 'down') {
        if (this.y < 83 * 5) {
            this.y = this.y + 83;
        }
    } else if (key == 'left') {
        if (this.x > 0) {
            this.x = this.x - 101;
        }
    } else if (key == 'right') {
        if (this.x < 101 * 4) {
            this.x = this.x + 101;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create instance of player
var playerInitX = 101 * 2;
var playerInitY = 83 * 5;
var player = new Player(playerInitX,playerInitY);

// Create instances of enemies as an array
// For the first level of the game, start with a total of 6 enemies
var nEnemies = 3;
var allEnemies = [];
var enemyInitXmin = -101 * 3;
var enemyInitXmax = 0;
var enemySpeedMin = 100;
var enemySpeedMax = 400;
for (i = 0; i < nEnemies; i++) {
    var enemyX = Math.random() * (enemyInitXmax - enemyInitXmin) + enemyInitXmin;
    var enemyY = (i % 3 + 1) * 83;
    var enemySpeed = Math.random() * (enemySpeedMax - enemySpeedMin) + enemySpeedMin;
    allEnemies[i] = new Enemy(enemyX,enemyY,enemySpeed);
    console.log(enemyY);
}

// var enemyInitX = [0, 0, 0, -101*5, -101*5, -101*5];
// var enemyInitY = [83, 2*83, 3*83];
// var enemySpeed = [20, 50, 40, 35, 25, 30];

// var allEnemies = [];
// for (i = 0; i < enemyInitX.length; i++) {
//     allEnemies[i] = new Enemy(enemyInitX[i],enemyInitY[i],enemySpeed[i]);
// }


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
