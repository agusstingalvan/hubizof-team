
export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }
    init(data){
    }
    preload(){}

    create() {

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "finB")
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY,'Perdiste el juego GAME OVERR!!!').setOrigin(.5)
    }
    update(){
       
    }
}