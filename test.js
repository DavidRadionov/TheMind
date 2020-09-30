class User {
    
    constructor(name,quatity,cards) {

        this.name = name;
        this.quatity = quatity;
        this.cards = cards;

    }

    showCards() {
        console.log(this.name);
        console.log(this.cards);
    }
    putTheCard() {
        let index = this.cards.indexOf(3);
        this.cards.splice(index,1);
        this.showCards();
    }
    toVote() {

    }
}
class Cards {
    Cards(cards,quatity) {
        this.cards = cards;
        this.quatity = quatity;
    }
}

let a = new User("david",2,[1,2,3,4]); 
a.putTheCard();