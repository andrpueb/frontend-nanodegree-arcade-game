var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = setSpeed();
};

var setSpeed = function () {
    random = Math.random();
    if (random < 0.33) {
        return 220;
    } else if (random > 0.66) {
        return 150;
    } else {
        return 300;
    }
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
var enemyYpositions = [140, 220, 300];
var enemyXpositions = [-100, -500, -800, -1000, -300, -2000, -1500];

var changeYposition = function () {
    return enemyYpositions[Math.floor(Math.random() * (3))];
};

var changeXposition = function () {
    return enemyXpositions[Math.floor(Math.random() * (8 - 1 + 0) + 1)];
};

//enemy instantiation
var enemyOneOne = new Enemy(changeXposition(), changeYposition());
var enemyOneTwo = new Enemy(changeXposition(), changeYposition());
var enemyTwoOne = new Enemy(changeXposition(), changeYposition());
var enemyTwoTwo = new Enemy(changeXposition(), changeYposition());
var enemyThreeOne = new Enemy(changeXposition(), changeYposition());
var enemyThreeThree = new Enemy(changeXposition(), changeYposition());


var allEnemies = [enemyOneOne, enemyOneTwo, enemyThreeOne, enemyTwoOne, enemyTwoTwo, enemyThreeThree];

Enemy.prototype.update = function (dt) {
    if (this.x < 600) {
        this.x = this.x + (dt * this.speed) * level();
    } else {
        this.x = changeXposition();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The superclass
var Element = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

Element.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//I create a function to make the inheritance process faster
var inherit = function(subClass, superClass){
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
}

var collisionCounter = 0;

Enemy.prototype.collision = function(){
    if (this.x >= player.x - 55 && this.x <= player.x + 55 && this.y >= player.y - 55 && this.y <= player.y) {
            collisionCounter++;
            pow.x = player.x;
            pow.y = player.y + 50;
            console.log(collisionCounter);
            setTimeout(function () {
                pow.x = -100;
                pow.y = -100;

            }, 200);
            player.y = 400;
            player.x = 303;
        }
}


//Pushes a black heart into array to draw a black heart in case of collision

function countCollision() {
    if (collisionCounter === 1) {
        lifeLessArray[0] = oneLess;
    } else if (collisionCounter === 2) {
        lifeLessArray[1] = twoLess;
    } else if (collisionCounter === 3) {
        lifeLessArray[2] = threeLess;
        gameOverScreen.render();
    }
}

var Player = function (x, y, sprite) {
};

inherit(Player, Element);

var player = new Player();
    player.x = 303;
    player.y = 400;
    player.sprite = 'images/char-boy.png';

Player.prototype.update = function () {

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
                this.x = 303;
                this.y = 400;
            }.bind(this), 100); //needed to bind "this" to player "this" because setTimeout uses global scope
        }
    } else if (chPosition == 'down' && this.y < 404) {
        this.y = this.y + 82;
    }
};

//Whenever the players collides width a bug a POW! image will appear
var Pow = function(){

};

inherit(Pow, Element);

var pow = new Pow();
    pow.x = -200;
    pow.y = -400;
    pow.sprite = 'images/pow.png';





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

var Title = function() {

}

inherit(Title, Element);

var title = new Title();
    title.x = 50;
    title.y = 20;
    title.sprite = "images/frogger.png";

var menuBackground = {
    x: 0,
    y: 0,
    width: 707,
    height: 650
};

menuBackground.render = function () {
    ctx.fillStyle = 'rgb(24,93,107)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    title.render();
};

//Draw characters

var allCharacters = [];

var Character = function(x, y, sprite){
    allCharacters.push(this);
}

inherit(Character, Element);

var catChar = new Character();
    catChar.x = 101;
    catChar.y = 200;
    catChar.sprite = "images/char-cat-girl.png";
var hornChar = new Character();
    hornChar.x=202;
    hornChar.y=200;
    hornChar.sprite='images/char-horn-girl.png';
var pinkGirl = new Character();
    pinkGirl.x = 303;
    pinkGirl.y = 200;
    pinkGirl.sprite = 'images/char-pink-girl.png';
var charBoy = new Character();
    charBoy.x=404,
    charBoy.y=200,
    charBoy.sprite= 'images/char-boy.png';
var prinGirl = new Character()
    prinGirl.x =505;
    prinGirl.y =200;
    prinGirl.sprite = 'images/char-princess-girl.png'

//Get the position of the mouse in the canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };

}

var Selector = function () {
}

inherit(Selector, Element);

var selector = new Selector();
    selector.x= 303;
    selector.y= 200;
    selector.sprite = 'images/Selector.png';

//Select your character text

function startText() {
    ctx.font = '30PT Verdana';
    ctx.fillStyle = 'orange';
    ctx.fillText('Select your character', 160, 220);
}

//Start button

var GoButton = function(){

}

inherit(GoButton, Element);

var goButton = new GoButton();
    goButton.x = 300;
    goButton.y = 380;
    goButton.sprite ='images/go.png';


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

//CHANGE CHARACTER
function changeCharacter(e) {
    var pos = getMousePos(canvas, e);
    posx = pos.x;
    posy = pos.y;
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

var ScoreBoard = {};

var Life = function(){

}

inherit(Life, Element);

var life = new Life()
    life.x = 620;
    life.y = 180;
    life.sprite = 'images/life.png';

var Heart = function(){

}

inherit(Heart, Element);
Heart.prototype.sprite = 'images/Heart.png';

var Gem = function(){

}

inherit(Gem, Element);


ScoreBoard.render = function () {
    ctx.fillStyle = 'rgb(24,93,107)';
    ctx.fillRect(0, 0, 101, canvas.height);
    ctx.fillStyle = 'rgb(24,93,107)';
    ctx.fillRect(0, 0, canvas.width, 135);
    ctx.fillStyle = 'rgb(24,93,107)';
    ctx.fillRect(606, 0, 707, canvas.height);
    title.render();
    life.render();
    gemScore();
    levelBoard();
    restoreLifes();
};

var heartOne = new Heart();
    heartOne.x = 606;
    heartOne.y = 200;
var heartTwo = new Heart();
    heartTwo.x = 606;
    heartTwo.y = 300;
var heartThree = new Heart();
    heartThree.x = 606;
    heartThree.y = 400;


var lifesArray = [heartOne, heartTwo, heartThree];

var HeartBlack = function(){

};


inherit(HeartBlack, Element);


HeartBlack.prototype.sprite = "images/HeartBlack.png";
HeartBlack.prototype.id = this.id;


var oneLess = new HeartBlack();
    oneLess.id = 0;
    oneLess.x = 606;
    oneLess.y = 200;
var twoLess = new HeartBlack();
    twoLess.id = 1;
    twoLess.x = 606;
    twoLess.y = 300;
var threeLess = new HeartBlack();
    threeLess.id = 2;
    threeLess.x = 606;
    threeLess.y = 400;

//The array to push the black hearts when the player colides against a bug
var lifeLessArray = [];


//If the player has more than 5 gems and collides against a bug then 5 gems will be taken to recover one heart
function restoreLifes() {
    if ((lifeLessArray.length === 1) && (gemCounter >= 5)) {
        lifeLessArray.pop();
        gemCounter = gemCounter - 5;
        collisionCounter = 0;
    } else if ((lifeLessArray.length === 2) && (gemCounter >= 5)) {
        lifeLessArray.pop();
        gemCounter = gemCounter - 5;
        collisionCounter = 1;
    }
}


//Gems collected
function gemScore() {
    ctx.font = '35px Share Tech Mono';
    ctx.fillStyle = 'rgb(145, 170, 157)';
    ctx.fillText("GEMS", 12, 350);
    ctx.font = '35px Share Tech Mono';
    ctx.fillStyle = 'rgb(145, 170, 157)';
    ctx.fillText(gemCounter, 30, 400);
}


//Level achieved
function levelBoard() {
    ctx.font = '35px Share Tech Mono';
    ctx.fillStyle = 'rgb(145, 170, 157)';
    ctx.fillText("Level", 12, 450);
    ctx.font = '35px Share Tech Mono';
    ctx.fillStyle = 'rgb(145, 170, 157)';
    ctx.fillText(level(), 30, 500);
}

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


gameOverScreen.render = function () {
    if (lifeLessArray.length > 2) {
        ctx.fillStyle = 'rgba(182,73,38,.4)';
        ctx.fillRect(0, 0, canvas.width,
            canvas.height);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.drawImage(Resources.get(tryAgain.sprite), tryAgain.x, tryAgain.y);
        window.addEventListener('mousedown', againButton, false);
    }
};

function againButton() {
    window.addEventListener('mousedown', function continueGame(e) {
        var pos = getMousePos(canvas, e);
        var posx = pos.x;
        var posy = pos.y;
        if ((posx > 310 && posx < 390) && (posy > 395 && posy < 470)) {

        }
    }, false);
}

//Arrays with possible position for the gems
var gemXpositions = [120, 221, 322, 423, 524];
var gemYpositions = [190, 270, 350];

var blueGem = new Gem();
blueGem.sprite = "images/Gem Blue.png";
var greenGem = new Gem();
greenGem.sprite = "images/Gem Green.png";
var orangeGem = new Gem();
orangeGem.sprite = "images/Gem Orange.png";


//Intervals to draw the gems in the canvas
setInterval(function () {
    //if the gem is visible in the canvas then move it out
    if (blueGem.x > 0 && blueGem.y > 0) {
        blueGem.x = -100;
        blueGem.y = -100;
        // if is not visible then put it in random position
    } else {
        blueGem.x = gemXpositions[Math.floor(Math.random() * 5)];
        blueGem.y = gemYpositions[Math.floor(Math.random() * 3)];
    }
}, (5000 * Math.random()) + 5000);

setInterval(function () {
    if (orangeGem.x > 0 && orangeGem.y > 0) {
        orangeGem.x = -100;
        orangeGem.y = -100;
    } else {
        orangeGem.x = gemXpositions[Math.floor(Math.random() * 5)];
        orangeGem.y = gemYpositions[Math.floor(Math.random() * 3)];
    }
}, (5000 * Math.random()) + 5000);

setInterval(function () {
    if (greenGem.x > 0 && greenGem.y > 0) {
        greenGem.x = -100;
        greenGem.y = -100;
    } else {
        greenGem.x = gemXpositions[Math.floor(Math.random() * 5)];
        greenGem.y = gemYpositions[Math.floor(Math.random() * 3)];
    }
}, (5000 * Math.random()) + 5000);

//Gem counter for the Gems collected
var gemCounter = 0;

function GemCollision() {
    var greenX = greenGem.x;
    var greenY = greenGem.y;
    var orangeX = orangeGem.x;
    var orangeY = orangeGem.y;
    var blueX = blueGem.x;
    var blueY = blueGem.y;
    if (player.x >= greenX - 55 && player.x <= greenX + 55 && player.y >= greenY - 55 && player.y <= greenY) {
        greenGem.x = -100;
        greenGem.y = -100;
        gemCounter += 1;
    } else if (player.x >= orangeX - 55 && player.x <= orangeX + 55 && player.y >= orangeY - 55 && player.y <= orangeY) {
        orangeGem.x = -100;
        orangeGem.y = -100;
        gemCounter += 2;
    } else if (player.x >= blueX - 55 && player.x <= blueX + 55 && player.y >= blueY - 55 && player.y <= blueY) {
        blueGem.x = -100;
        blueGem.y = -100;
        gemCounter += 3;
    }
}


function level() {
    if (gemCounter < 10) {
        return 1;
    } else if ((gemCounter >= 10) && (gemCounter < 20)) {
        return 2;
    } else if ((gemCounter >= 20) && (gemCounter < 30)) {
        return 3;
    } else if ((gemCounter >= 30) && (gemCounter < 40)) {
        return 4;
    } else if (gemCounter >= 40) {
        return 5;
    }
}
