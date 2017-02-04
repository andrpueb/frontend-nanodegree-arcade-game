var Enemy = function (y) {
    this.x = (Math.random() * 10) * (-100);
    this.y = y;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x < 600) {
        this.x = this.x + (100 * dt);
    } else if (this.x > 505) {
        this.x = -100;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var createEnemy = function () {

};


var enemyOneOne = new Enemy(140);
var enemyOneTwo = new Enemy(140);
var enemyTwoOne = new Enemy(220);
var enemyTwoTwo = new Enemy(220);
var enemyThreeOne = new Enemy(300);
var enemyThreeThree = new Enemy(300);

var Player = function () {
    this.x = 303;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {

};

var Pow = function (x, y) {
    this.x = -200;
    this.y = -400;
    this.sprite = 'images/pow.png';
};

Pow.prototype.render = function (x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



var collisionCounter = 0;
function countCollision(){
    if(collisionCounter === 1){
        lifeLessArray[0] = oneLess;
    }else if (collisionCounter === 2){
        lifeLessArray[1]= twoLess;
    }else if (collisionCounter === 3){
        lifeLessArray[2] = threeLess;
        gameOverScreen.render();
    }
}


Player.prototype.collision = function () {
    for (var i = 0; i < allEnemies.length; i++) {
        var enemies = allEnemies[i];
        var thePlayerX = this.x;
        var thePlayerY = this.y;

        if (enemies.x >= thePlayerX - 55 && enemies.x <= thePlayerX + 55 && enemies.y >= thePlayerY - 55 && enemies.y <= thePlayerY) {
            collisionCounter++;
            pow.x = thePlayerX;
            pow.y = thePlayerY + 50;
            setTimeout(function () {
                pow.x = -100;
                pow.y = -100;

            }, 200);
            player.y = 400;
            player.x = 303;
            }
        countCollision();
        }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (chPosition) {
    if (chPosition === 'left' && this.x > 202) {
        this.x = this.x - 100;
    } else if (chPosition === 'right' && this.x < 404) {
        this.x = this.x + 100;
    } else if (chPosition === 'up' && this.y > 100) {
        this.y = this.y - 82;
        if (this.y < 100) {
            setTimeout(function () {
                player.y = 400;
                player.x = 303;
            }, 100);
        }
    } else if (chPosition == 'down' && this.y < 404) {
        this.y = this.y + 82;
    }
};

Player.prototype.update = function () {

};




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var allEnemies = [enemyOneOne, enemyOneTwo, enemyThreeOne, enemyTwoOne, enemyTwoTwo, enemyThreeThree];

var player = new Player();
var pow = new Pow();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//My new elements

//Menu background

var menuBackground = {
    x: 0,
    y: 0,
    width: 707,
    height: 650
};

var froggerTitle = {
    x: 50,
    y: 20,
    sprite: "images/frogger.png"
};

froggerTitle.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


menuBackground.render = function () {
    ctx.fillStyle = 'rgb(24,93,107)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    froggerTitle.render();
};

//Draw characters

var allCharacters = [];

function Character(x, y, sprite) {
    this.x = x,
        this.y = y,
        this.sprite = sprite,
        allCharacters.push(this)
}
Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var catChar = new Character(101, 200, "images/char-cat-girl.png");
var hornChar = new Character(202, 200, 'images/char-horn-girl.png');
var pinkGirl = new Character(303, 200, 'images/char-pink-girl.png');
var charBoy = new Character(404, 200, 'images/char-boy.png');
var prinGirl = new Character(505, 200, 'images/char-princess-girl.png');






//GET POSITION OF THE MOUSE

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };

}

var selector = {
    x: 303,
    y: 200,
    sprite: 'images/Selector.png'
};

selector.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Select your character text

function startText() {
    ctx.font = '30PT Verdana';
    ctx.fillStyle = 'orange';
    ctx.fillText('Select your character', 160, 220);

}

//Start button

var goButton = {
    x: 300,
    y: 380,
    sprite: 'images/go.png'
};

goButton.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


function start(main) {
    window.addEventListener('mousedown', function startGame(e) {
        var pos = getMousePos(canvas, e);
        var posx = pos.x;
        var posy = pos.y;
        if ((posx > 310 && posx < 390) && (posy > 395 && posy < 470)) {
            main();
        }
    }, false);
}



function changeCharacter(e) {
    var pos = getMousePos(canvas, e);
    posx = pos.x;
    posy = pos.y;
    console.log(posx, posy);
    if ((posx > 101 && posx < 202) && (posy > 250 && posy < 400)) {
        player.sprite = "images/char-cat-girl.png";
        selector.x = catChar.x;
        selector.y = catChar.y;
    } else if ((posx > 202 && posx < 303) && (posy > 250 && posy < 400)) {
        player.sprite = 'images/char-horn-girl.png';
        selector.x = hornChar.x;
        selector.y = hornChar.y;
    } else if ((posx > 303 && posx < 404) && (posy > 250 && posy < 400)) {
        player.sprite = 'images/char-pink-girl.png';
        selector.x = pinkGirl.x;
        selector.y = pinkGirl.y;
    } else if ((posx > 404 && posx < 505) && (posy > 250 && posy < 400)) {
        player.sprite = 'images/char-boy.png';
        selector.x = charBoy.x;
        selector.y = charBoy.y;
    } else if ((posx > 505 && posx < 606) && (posy > 250 && posy < 400)) {
        player.sprite = 'images/char-princess-girl.png';
        selector.x = prinGirl.x;
        selector.y = prinGirl.y;
    }
    menuBackground.render();
    selector.render();

    allCharacters.forEach(function (character) {
        character.render();
    });

    startText();
    goButton.render();
}

window.addEventListener('mousedown', changeCharacter, false);

var scoreBoard = {};

var life ={
    x: 620,
    y: 180,
    sprite: 'images/life.png',
    render: function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

scoreBoard.render = function () {
    ctx.fillStyle = 'rgb(24,93,107)';
    ctx.fillRect(0, 0, 101, canvas.height);
    ctx.fillStyle = 'rgb(24,93,107)';
    ctx.fillRect(0, 0, canvas.width, 135);
    ctx.fillStyle = 'rgb(24,93,107)';
    ctx.te
    ctx.fillRect(606, 0, 707, canvas.height);
    froggerTitle.render();
    life.render();
};

var Heart = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = "images/Heart.png";
    this.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

var heartOne = new Heart(606, 200);
var heartTwo = new Heart(606, 300);
var heartThree = new Heart(606, 400);

var lifesArray = [heartOne, heartTwo, heartThree];

var HeartBlack = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = "images/HeartBlack.png";
    this.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

var lifeLessArray = [];

var oneLess = new HeartBlack(606, 200);
var twoLess= new HeartBlack(606, 300);
var threeLess = new HeartBlack(606, 400);


var gameOverScreen = {
    x: 180,
    y: 150,
    sprite: "images/gameOver.png"
};

var tryAgain = {
    x: 250,
    y: 450,
    sprite: "images/tryAgain.png"
};
gameOverScreen.render = function(reset){
    if(lifeLessArray.length >2){
        ctx.fillStyle = 'rgba(182,73,38,.4)';
        ctx.fillRect(0, 0, canvas.width,
                     canvas.height);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.drawImage(Resources.get(tryAgain.sprite), tryAgain.x, tryAgain.y);
        window.addEventListener('mousedown', againButton, false);
    }
};

function againButton(main) {
    window.addEventListener('mousedown', function continueGame(e) {
        var pos = getMousePos(canvas, e);
        var posx = pos.x;
        var posy = pos.y;
        if ((posx > 310 && posx < 390) && (posy > 395 && posy < 470)) {

        }
    }, false);
}

var Gem = function(x, y){
    this.x = x;
    this.y = y;
    this.render = function(){ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
                            };
};

var gemsArray = [];

var orangeGem = new Gem();
orangeGem.sprite = "images/Gem Orange.png";

var greenGem = new Gem();
greenGem.sprite = "images/Gem Green.png";

var blueGem = new Gem();
greenGem.sprite = "images/Blue Green.png";

function drawGems(){


}











