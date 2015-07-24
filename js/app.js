// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = 25;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x,y){
    //you need their location son
    this.x = x;
    this.y = y;
    this.speed = 20;
    //THE IMAGE SHEET FOR THE PLAYER
    this.sprite = 'images/char-boy.png';
}

player.prototype.update = function() {
    // hollered at me. 
    //console.log('player was updated: ');

    // Are they touching?
    if (
        this.x <= (Enemy.x + 32)
        && Enemy.x <= (this.x + 32)
        && this.y <= (this.y + 32)
        && Enemy.y <= (this.y + 32)
    ) {
        console.log('beep beep');
        //++monstersCaught;
        //reset();
    }

}

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

player.prototype.handleInput = function(keyboard){
    //test to see if it's working first
    console.log(keyboard);
    //STRAIGHT JACKED FROM 
    //http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
    if( keyboard === 'up'){
        console.log('go left!');
        player.y -= player.speed;
    };

    if(keyboard === 'down' ){
        player.y += player.speed;
    };

    if(keyboard === 'left' ){
        player.x -= player.speed;
    };

    if(keyboard === 'right' ){
        player.x += player.speed;
    };

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
// Draw the player on the screen
var player = new player(202.5, 383);
//randomly create enemies
var enemy = new Enemy(0, Math.random() * 180, Math.random() * 250);
allEnemies.push(enemy);

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
