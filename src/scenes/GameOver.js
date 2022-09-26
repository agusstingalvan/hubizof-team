

export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }
    init(data){
    }
    preload(){}

    create() {
        this.add.text(500, 500,'Perdiste el juego GAME OVERR!!!')
    }
    update(){
       
    }
}