

export default class Victoria extends Phaser.Scene {
    constructor() {
        super("Victoria");
    }
    init(data){
    }
    preload(){}

    create() {

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "finA")
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY,'Ganaste el juego Felicidades!!!').setOrigin(.5)
    }
    update(){
       
    }
}