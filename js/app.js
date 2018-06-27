// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // variables for the x and y position of the enemies
    this.x;
    this.y;
    // speed is a value you add to the enemies x in order to move them across the screen
    this.speed;
    // set position of where enemy starts
    this.startPosition();
};
Enemy.prototype.startPosition = function() {
    // the enemies' x starting position is negative bc they start off screen
    this.x = -101;
    // the random function randomly decides which row the enemy will start in (0-3)
    this.y = Math.floor(Math.random() * 4) * 85 + 60;
    this.speed = Math.floor(Math.random() * 50) + 90;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // checks if ememy is off screen to move it to the start position
    // if enemy is not off screen add speed to the x position
    if (this.x > 504) {
        this.startPosition();
    } else {
        this.x += this.speed * dt;
    }
    // Check for player collision
    // if they collide - send player to start position
    if (this.y === player.y) {
        if (this.x + 81 > player.x && this.x < player.x + 71) player.startPosition();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // variables for the x and y position of the player
    this.x;
    this.y;
    this.sprite = 'images/char-pink-girl.png';
    // set position of where player starts
    this.startPosition();
}
Player.prototype.startPosition = function() {
    this.x = 202;
    this.y = 400;
}
Player.prototype.update = function(dt) {
    //
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// used a switch statement to determine which direction the player will move
// limit the movement to keep the player from going off screen
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            if (this.x > 100) this.x -= 101;
            break;
        case 'up':
            if (this.y > 60) this.y -= 85;
            else {
                this.y -= 85;
                winAlert();
                this.startPosition();
            }
            break;
        case 'right':
            if (this.x < 404) this.x += 101;
            break;
        case 'down':
            if (this.y < 400) this.y += 85;
            break;
        default:
    }
}
/*
player = {
    x:0,
    y:0,
    sprite: 'images/char-boy.png',
    startPosition: function() {
        this.x = 202;
        this.y = 400;
    },
    update: function(dt) {  },
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    handleInput: function(direction) {
        switch(direction) {
            case 'left':
                if (this.x > 100) this.x -= 101;
                break;
            case 'up':
                if (this.y > 60) this.y -= 85;
                else this.startPosition();
                break;
            case 'right':
                if (this.x < 404) this.x += 101;
                break;
            case 'down':
                if (this.y < 400) this.y += 85;
                break;
            default:
        }
    }
}
*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (let i=0; i<5; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();
// create an alert with player wins game
function winAlert() {
    alert('You win!');
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
