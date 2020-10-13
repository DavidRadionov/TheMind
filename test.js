class Start {
    constructor() {
      
        
    }
    
    start(lvl) {
        
        const app = new PIXI.Application({ antialias: true });
        document.body.appendChild(app.view);
        
        const btn = new PIXI.Sprite();
        btn.interactive = true;
        btn.buttonMode = true;
        const startButton = new PIXI.Graphics();

        // Rectangle

        startButton.beginFill(0xDE3249);
        startButton.drawRect(app.view.width/2 - 50, app.view.height/2 - 50, 100, 100);
        startButton.endFill();

        btn.addChild(startButton);
        app.stage.addChild(btn);

        btn.on("click", () => {
            alert("Game started");
            let game = new Game(app);
            btn.parent.removeChild(btn);
        
            game.startGame(lvl,app);
            let draw = new Draw(game);
            draw.drawGame(app);
            game.startBot();
        });
        
    }
}
class Game extends Start {
    
    constructor(app){
        super();
        this.app = app;
        this.lvl = 1;
        this.users = [];
        this.quatityUsers = this.users.length;
        this.cards = new Cards();
        this.cardsOnTheTable = [];
        this.outputCardsBot = [];
    }

    
    startBot() {
        let time = 1000;
        this.outputCardsBot = [];
        for (const card of  this.users[1].drawCards) {
            setTimeout(()=>{
                let a = card;
                a.x = this.app.view.width/2 - 50;
                a.y = this.app.view.height/2 - 75;
                
                this.app.stage.removeChild(card);
                this.users[1].putTheCard(card.cardValue);
                this.app.stage.addChild(a);
                card.game.checkPutTheCard(card.cardValue,this.app);
            }, card.cardValue*time);
        }

    }
    addUser(user) {
        this.users.push(user);
    }
    startGame(lvl) {
        this.users = [];
        this.cards = new Cards();
        this.cardsOnTheTable = [];
        this.addUser(new User("David",true));
        this.addUser(new User("Bot-_-",false));
        this.lvl = lvl;
        this.cards.shuffleDeck();
        for (const user of this.users) {
            user.reset();

            for (let j = 0; j < this.lvl; j++) {
                const card = this.cards.diealCard();
                user.addTheCard(card);
            }
            user.cards.sort(function(a,b){ 
                return a - b;
            })
        }

    }
    gameOver(app) {
        
        alert("Game over");
        this.lvl = 1;
        document.body.removeChild(app.view);;
        
        this.start(1);
        
    }
    checkPutTheCard(card,app) {
        this.quatityUsers = this.users.length;
        let n = 0;
        
        for (let i = 0 ; i < this.quatityUsers; i++) {
            if (this.users[i].cards.length > 0) {
                n++;
            }
        }
        
        if (n == 0) {
            alert("Вы переходите на следующий уровень");
            this.lvl++;
            document.body.removeChild(app.view);
            this.start(this.lvl);
            //return 1;
        } else {
            for (let i = 0 ; i < this.quatityUsers; i++) {
                this.users[i].quatityCards = this.users[i].cards.length;
                for (let j = 0 ; j < this.users[i].quatityCards; j++) {
                
                    if (this.users[i].cards[j] < card) {
                        this.gameOver(app);
                        //return -1;
                    }
                }
            }
            //return 0;
        }
    }
    show() {
        for (let i = 0 ; i  < this.quatityUsers; i++) {
            console.log(this.users[i].name);
        }
    }
}

class Cards {
    constructor() {
        this.cards = [];
    }
    shuffleDeck() {
        let a = 0;
        let b = 0;
        for(let i = 1 ; i <= 100; i++)this.cards.push(i);
        
        for (let i = 0; i < 100; i ++) {

            a = Math.ceil(Math.random()*100)
            b = this.cards[i];
            this.cards[i] = this.cards[a];
            this.cards[a] = b;
        }
    }
    diealCard() {
        return this.cards.pop();
    }
}
class User {
    
    constructor(name,player) {

        this.name = name;
        this.iAm = player;
        this.cards = [];
        this.drawCards = [];

    }
    reset() {
        this.cards = [];
    }
    showCards() {
        console.log(this.name);
        console.log(this.cards);
    }
    addTheCard(card) {
        this.cards.push(card);
        
    }
    deleteTheCard(card) {
        for (let i = 0 ; i < this.cards.length; i++) {
            if (this.cards[i] == card) {
                this.cards.splice(i,1);
                
            }
        }
        
    }
    putTheCard(card) {
        
        this.deleteTheCard(card); 
    }
    toVote() {

    }
}
class DrawCard extends PIXI.Sprite {
    constructor(game) {
        super();
        this.game = game;
        this.cardValue = 0;
    }
    deleteDraw(){}
    draw(isFaceUp = true,cardValue) {
        this.cardValue = cardValue;
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFF00FF, 1);
        const color = isFaceUp ? 0x650A5A : 0x333333;
        graphics.beginFill(color, 1);
        graphics.drawRoundedRect(0, 0, 100, 150, 16);
        graphics.endFill();

        this.addChild(graphics);

        if (isFaceUp) {
            const style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 36,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#ffffff', '#00ff99'], // gradient
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440,
                lineJoin: 'round'
            });
            
            const richText = new PIXI.Text(this.cardValue, style);
            richText.x = 25;
            richText.y = 40;

            this.addChild(richText);
        } else {
            const style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 36,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#ffffff', '#00ff99'], // gradient
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440,
                lineJoin: 'round'
            });
            
            const richText = new PIXI.Text(this.cardValue, style);
            richText.x = 25;
            richText.y = 40;

            this.addChild(richText);
        }
    }
}
class DrawTable extends PIXI.Sprite {
    constructor() {
        super();
    }
    draw(app) {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFF00FF, 1);
        const color = 0xDE3249;
        graphics.beginFill(color, 1);
        graphics.drawRoundedRect(app.view.width/2 - 175, app.view.height/2 - 100, 350, 200);
        graphics.endFill();

        //this.addChild(graphics);
        app.stage.addChild(graphics)
    }
}
class Draw {
    constructor(game) {
        this.game = game;
        this.cards = [];
        //this.xCard = 0;
        //this.yCard = 0;
    }
    
    drawGame(app) {
        let table = new DrawTable();
        table.draw(app);

        let i = 0;
        for (const user of this.game.users) {
            i = 0;
            if (user.iAm == true) {
                for (const card of user.cards) {
                    //let userDraw = new DrawCard(game);
                    user.drawCards[i] = new DrawCard(this.game);
                    user.drawCards[i].draw(true,card);
                    user.drawCards[i].x = 150 + i*75;
                    user.drawCards[i].y = app.view.height - 180;
                    user.drawCards[i].interactive = true;
                    user.drawCards[i].buttonMode = true;
                    app.stage.addChild(user.drawCards[i]);
                    user.drawCards[i].on("click", (event) => {

                        for (const userIam of event.target.game.users) {
                            if (userIam.iAm == true) {
                                
                                let a = event;
                                a.target.x = app.view.width/2 - 50;
                                a.target.y = app.view.height/2 - 75;
                                
                                app.stage.removeChild(event.target);
                                userIam.putTheCard(event.target.cardValue);
                                app.stage.addChild(a.target);
                                event.target.game.checkPutTheCard(event.target.cardValue,app)

                                
                            }
                        }
                        
                    })
                    i++;
                }
            } else {
                for (const card of user.cards) {
                    user.drawCards[i] = new DrawCard(this.game);
                    user.drawCards[i].draw(false,card);
                    user.drawCards[i].x = 150 + i*75;
                    user.drawCards[i].y = 10;
                    user.drawCards[i].interactive = true;
                    user.drawCards[i].buttonMode = true;
                    app.stage.addChild(user.drawCards[i]);
                    i++;
                }
            }
        }
        
    }
}

let go = new Start();
go.start(2);