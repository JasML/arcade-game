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

    if (this.x > blkWidth * 6) {
        this.x = Math.random() * (enemyInitXmax - enemyInitXmin) + enemyInitXmin;
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
    // Default image to cat-girl character
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {

}

// Add function for changing the player image
Player.prototype.newPlayer = function() {
    var currentImg = document.getElementById("playerSelect").options[document.getElementById("playerSelect").selectedIndex].value;
    if (currentImg=="boy") {
        this.sprite = 'images/char-boy.png';
    } else if (currentImg=="cat") {
        this.sprite = 'images/char-cat-girl.png';
    } else if (currentImg=="horn-girl") {
        this.sprite = 'images/char-horn-girl.png';
    } else if (currentImg=="pink-girl") {
        this.sprite = 'images/char-pink-girl.png';
    } else if (currentImg=="princess") {
        this.sprite = 'images/char-princess-girl.png';
    }
}

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    // Update either x or y position of player per keypad input, with limits
    // so that player does not disappear from the canvas.  If movement results
    // in a discrete movement of a single block, so the dt is not used.
    if (key == 'up') {
        if (this.y > 0) {
            this.y = this.y - blkHeight;
        }
    } else if (key == 'down') {
        if (this.y < blkHeight * 5) {
            this.y = this.y + blkHeight;
        }
    } else if (key == 'left') {
        if (this.x > 0) {
            this.x = this.x - blkWidth;
        }
    } else if (key == 'right') {
        if (this.x < blkWidth * 4) {
            this.x = this.x + blkWidth;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create instance of player
var playerInitX = blkWidth * 2;
var playerInitY = blkHeight * 5;
var player = new Player(playerInitX,playerInitY);

// Create instances of enemies as an array. For the first level of the game,
// start with a total of 6 enemies (2 on each of the 3 applicable lanes). The 
// initial x-position of each enemy is determined randomly between 1 and 9 
// block-widths to the left of the screen (the value of 9 was determined by
// testing various values and finding a value that resulted in reasonably smooth
// movement across the screen (instead of disctint clumps of enemies)
var nEnemies = 6;
var allEnemies = [];
var enemyInitXmin = -blkWidth * 9;
var enemyInitXmax = -blkWidth;
var enemySpeedMin = 200;
var enemySpeedMax = 400;
for (i = 0; i < nEnemies; i++) {
    var enemyX = Math.random() * (enemyInitXmax - enemyInitXmin) + enemyInitXmin;
    var enemyY = (i % 3 + 1) * blkHeight;
    var enemySpeed = Math.random() * (enemySpeedMax - enemySpeedMin) + enemySpeedMin;
    allEnemies[i] = new Enemy(enemyX,enemyY,enemySpeed);
}

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
