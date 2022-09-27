
export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }
    init(data){
    }
    preload(){}

    create() {

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "finB")
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY,'GAMEOVER', {fontStyle: 'bold', fontSize: 64} ).setOrigin(.5)
    }
    update(){
       
    }
}