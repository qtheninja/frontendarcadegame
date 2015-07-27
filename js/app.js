// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed + 10;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //Let's compare the location of the bug off screen with the canvas width
    //if it's slipping of then let's go ahead and have it jump back to the left side
    //and start it's journey all over again
    if (this.x >= 505) {
        this.x = 0;
        //the longer you hang around the more you're gong to hurt
        this.speed = this.speed + 15;
        //let's make it reappear randomly on the road
        this.y = Math.random() * 180;
    }

    this.checkDefeat();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    //you need their location son
    this.x = x;
    this.y = y;
    this.speed = 80;
    //THE IMAGE SHEET FOR THE PLAYER
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // hollered at me.
    //console.log('player was updated: ');
    //Check if the player has achieved the goal
    this.checkVictory();
    //Make sure they don't escape the canvas area
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.x > 420) {
        this.x = 420;
    }
    if (this.x < -18) {
        this.x = -18;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyboard) {
    //test to see if it's working first
    //console.log(keyboard);
    //STRAIGHT JACKED FROM
    //http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
    if (keyboard === 'up') {
        console.log('go left!');
        this.y -= this.speed;
    }

    if (keyboard === 'down') {
        this.y += this.speed;
    }

    if (keyboard === 'left') {
        this.x -= this.speed + 20;
    }

    if (keyboard === 'right') {
        this.x += this.speed + 20;
    }
};

// check to see if the player loses
Enemy.prototype.checkDefeat = function() {
    if (Player.y + 131 >= this.y + 90 &&
        Player.x + 25 <= this.x + 88 &&
        Player.y + 73 <= this.y + 135 &&
        Player.x + 76 >= this.x + 11) {
        console.log('oops!');
        Player.x = 202.5;
        Player.y = 383;
    }
};

Player.prototype.checkVictory = function() {
    if (this.y + 50 <= 50) {

        console.log('VICTORY!');
        //after you achieve the victory you need to clear the area
        ctx.clearRect(0, 0, 505, 606);
        this.x = 202.5;
        this.y = 383;
        location.reload();
    }
};

var resetBug = function(bug) {
    ctx.clearRect(0, 0, 505, 606);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Draw the player on the screen
var Player = new Player(202.5, 383);

//Random number between 1 and 4, this will determine the number of bugs
var enemyCount = Math.floor((Math.random() * 4) + 1);
for (i = 0; i < enemyCount; i++) {
    //take the random enemy number count and iterate with each one randomly appearing
    // along the path and with variability in speed.
    var enemy = new Enemy(0, Math.random() * 180, Math.random() * 250);
    //Add the enemies onto allEnemies which was provided via engine.js
    allEnemies.push(enemy);
}

var reset = function(){
    ctx.clearRect(0, 0, 505, 606);
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

    Player.handleInput(allowedKeys[e.keyCode]);
});