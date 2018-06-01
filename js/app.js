
// Enemies our player must avoid

window.onload = function() {

    displayMessage('Start game by clicking start');

    document.querySelector('#left').onclick = function(){
       shuf(this.id);
    };
    document.querySelector('#right').onclick = function(){
        shuf(this.id);
    };


    document.querySelector('#myBtn').onclick = function(){
       
        getEnemies();
        document.querySelector('#id01').style.display='none';

    };
    
    
};

function shuf(id){
    var img = document.querySelector('#character').getAttribute('src');
    console.log(typeof img);
    console.log(img);
    selectCharacter(img, id);
}

function changeImg(src){

    var path = 'images/'+src;
    document.querySelector('#character').setAttribute('src',path);
    
    console.log(typeof path)
    player.changeLooks(path); 

}

function displayMessage(message){
    document.querySelector('#id01').style.display='block';
    document.querySelector('.prompt').innerHTML = message;

}

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;

    if(level < 4){
        console.log(level+"test")
    this.speed = Math.floor(Math.random() * (300)) + 80 ;
    console.log(this.speed);
    // we've provided one for you to get started
    }else {
        this.speed = 500;
        console.log(this.speed);
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x = this.x + (this.speed * dt) ;
    if (this.x > 500) {
        this.x = -200;
    }
    this.collisionCheck(player);
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collisionCheck = function(player) {
 if (player.x < this.x + 55 &&
        player.x + 55> this.x &&
        player.y < this.y + 20 &&
        20 + player.y > this.y) {
            player.reset();
            lifeRemove();
            removeScore();
        }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
console.log()
var level = 0;

Player.prototype.changeLooks = function(path){
    this.sprite = path;
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 390;
    
};

Player.prototype.initialLives = function(){

    document.querySelector('#life').innerHTML = 3;

};

Player.prototype.update = function(dt){

};

Player.prototype.render = function(){
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key){
    switch(key) {
        case 'left':
            if(this.x > 0){
                this.x = this.x -100;
            }
             break;
        case 'right':
            if (this.x < 400) {
                this.x = this.x + 100;
            }
            break;
        case 'up':
            if (this.y > 80) {
                this.y = this.y - 80;
            }else {
                this.reset();
                updateLevel();
                updateScore();
                  }
            break;
        case 'down':

            if (this.y < 390) {
                this.y = this.y + 80;
            }
            break;
        default:
            break;
    }
};
    

let updateLevel = function() {
    level ++;
    document.querySelector('#level').innerHTML = level;
};

let updateScore = function() {
    let score = document.querySelector('#score').innerHTML;
    score = parseInt(score) + 50;
    console.log(score);
    document.querySelector('#score').innerHTML = score;
};


let lifeRemove = function() {
    let lifes = document.querySelector('#life').innerHTML;
    if(lifes > 1){
    lifes --;
    document.querySelector('#life').innerHTML = lifes;
    } else {
        gameReset();
        displayMessage('Game Over');

    }

};

 let removeScore = function() {
    let score = document.querySelector('#score').innerHTML;
    if(score > 0){
        score-=50;
        document.querySelector('#score').innerHTML = score;
    } else {
        score = 0
        document.querySelector('#score').innerHTML = score;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
var chosen = document.querySelector('#character').getAttribute('src');

var player = new Player(200,390);

let allEnemies = new Array();
let elemiesLines = new Array();


let getEnemies = function() {
    const bugs = 4;
    let randomPosition = function () {
        const position = [60, 140, 220];
        return position[Math.floor(Math.random()*3)];
    };

    for (let i = 0; i<bugs; i++){
        let newEnemy = new Enemy();
        newEnemy.x = 0;
        newEnemy.y = randomPosition();
        elemiesLines.push(newEnemy.y);

        allEnemies.push(newEnemy);

    };

    enemyCheck();

};


let enemyCheck = function() {
    let top = elemiesLines.includes(60);
    let middle = elemiesLines.includes(140);
    let bottom = elemiesLines.includes(220);
    if(top === false) {
        console.log(top);

        // let newEnemy = new Enemy();
        // newEnemy.x =0;
        // newEnemy.y = 60;
        // allEnemies.push(newEnemy);
    }
    if (middle === false) {
        let newEnemy = new Enemy();
        newEnemy.x =0;
        newEnemy.y = 140;
        allEnemies.push(newEnemy);
    }
    if (bottom === false) {
        let newEnemy = new Enemy();
        newEnemy.x =0;
        newEnemy.y = 220;
        allEnemies.push(newEnemy);
    }
}

function gameReset() {
    document.querySelector('#life').innerHTML = 3;
    player.reset();
    allEnemies = [];
    elemiesLines = [];
};

var charImage = [
    'char-boy.png',
    'char-cat-girl.png',
    'char-horn-girl.png',
    'char-pink-girl.png',
    'char-princess-girl.png'
]

function selectCharacter(element, id){
    var element = element.split('/');
    element = element[element.length-1];

    let currentKey = charImage.indexOf(element);
    
    if(id === right){
        if((currentKey)>1){
            return changeImg(charImage[currentKey+1]);
        }else {
            return changeImg(charImage[0]);
        }
    }else{
         if((currentKey)>1){
            return changeImg(charImage[currentKey-1]);
        }else {
            currentKey = charImage.length-1;
            return changeImg(charImage[currentKey-1]);
        }
    }

}