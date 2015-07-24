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
}

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
    if (this.x >= 505){
        this.x = 0;
        //the longer you hang around the more you're gong to hurt
        this.speed = this.speed + 15;
        //let's make it reappear randomly on the road
        this.y = Math.random() * 180; 
    };

    checkDefeat(this);
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

    checkVictory(this);


    if (player.y > 400 ) {
        player.y = 400;
    };
    if (player.x > 420) {
        player.x = 420;
    };
    if (player.x < -18) {
        player.x = -18;
    };

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

};


// check to see if the player loses

var checkDefeat = function(enemyBug){

        if ( player.y + 131 >= enemyBug.y + 90
        && player.x + 25 <= enemyBug.x + 88
        && player.y + 73 <= enemyBug.y + 135
        && player.x + 76 >= enemyBug.x + 11) {
        console.log('oops!');
        player.x = 202.5;
        player.y = 383;
    }
};

var checkVictory = function(player){
       if (player.y + 50 <= 0) {        
        player.x = 202.5;
        player.y = 383;
        console.log('VICTORY!');

        //after you achieve the victory you need to clear the area
        ctx.fillStyle = 'white';
        ctx.clearRect(0,0, 505, 606);
    }
};

var resetBug = function (bug){

    ctx.clearRect(0,0, 505,606);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
// Draw the player on the screen
var player = new player(202.5, 383);

//Random number between 1 and 10
var enemyCount = Math.floor((Math.random() * 10) + 1);
console.log(enemyCount);
for (i = 0; i < enemyCount; i ++ ){
    //randomly create enemies
    var enemy = new Enemy(0, Math.random() * 180, Math.random() * 250);
    allEnemies.push(enemy);
};


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
