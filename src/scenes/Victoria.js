

export default class Victoria extends Phaser.Scene {
    constructor() {
        super("Victoria");
    }
    init(data){
    }
    preload(){}

    create() {

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "finA")
        this.add.text(this.cameras.main.centerX + ((this.scale.width / 2) / 2) + 40, this.cameras.main.centerY + 120,'GANASTE!', {fontStyle: 'bold', fontSize: 64}).setOrigin(.5)
    }
}