class Cards {
    constructor(quatity) {
        for (let i = 0 ; i < quatity; i++) this.cards.push(i);
        this.quatity = quatity;
    }
    getCards() {
        return this.cards;
    }
    getQuatity() {
        return this.quatity;
    }
    setCards(quatity) {
        for (let i = 0 ; i < quatity; i++) this.cards.push(i);
        this.quatity = quatity;
    } 
}
class Game {
    constructor(){
        this.users = [];
        this.quatityUsers = this.users.length;
        this.cards = [];
        this.quatityCards = this.cards.length;
    }
    addUser(user) {
        this.users.push(user);
    }
    startGame() {

        this.quatityUsers = this.users.length;
        
    }
    gameOver() {
        console.log("Game over");
    }
    checkPutTheCard(card) {
        console.log("ну функция открылась") ;
        this.quatityUsers = this.users.length;
        for (let i = 0 ; i < this.quatityUsers; i++) {
            this.users[i].quatityCards = this.users[i].cards.length;
            for (let j = 0 ; j < this.users[i].quatityCards; j++) {
                console.log("Ну цикл тоже открылся")
                if (this.users[i].cards[j] < card) {
                    console.log("Ну с оператором все норм");
                    return -1;
                    
                }
            }
        }
        return 0;
    }
    show() {
        for (let i = 0 ; i  < this.quatityUsers; i++) {
            console.log(this.users[i].name);
        }
    }
}
class User {
    
    constructor(name) {

        this.name = name;
        this.cards = [];
        this.quatity = this.cards.length;

    }

    showCards() {
        console.log(this.name);
        console.log(this.cards);
    }
    addTheCard(card) {
        this.cards.push(card);
        this.quatity++;
        console.log(this.quatity + ": " + card);
    }
    deleteTheCard(card) {
        this.cards.splice(card,1);
        this.quatity--;
    }
    putTheCard(card, a) {
        console.log("Card: " + card);
        this.a = a;
        if (this.a.checkPutTheCard(card) == 0) {
            console.log(card);
            //this.deleteTheCard(card);
        }  else this.a.gameOver();   
    }
    toVote() {

    }
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let game = new Game;

let buttonStart = document.getElementById("Start");
buttonStart.onclick = game.startGame();
buttonStart.addEventListener();

let name;
let quatityCards;
alert("Напишите свое имя");
game.addUser(new User("David"));
game.addUser(new User("Artem"));

for (let i = 0 ; i < 2 ; i ++) {
    for (let j = 0; j < 5; j++) {
        game.users[i].addTheCard(getRandomIntInclusive(0,100));
    }
}
for (let i = 0 ; i < 2; i ++) {
    game.users[i].putTheCard(game.users[i].cards[getRandomIntInclusive(0,4)],game);
}